(function () {
  var form = document.getElementById("order-form");
  var preview = document.getElementById("order-preview");
  var estimate = document.getElementById("order-estimate");
  var copyBtn = document.getElementById("order-copy");
  var sendXBtn = document.getElementById("order-send-x");
  var sendDiscordBtn = document.getElementById("order-send-discord");
  if (!form || !window.ORDER_CONFIG || !window.PRICE_ITEMS) return;

  function initOrderPageText() {
    var page = window.ORDER_PAGE;
    if (!page) return;

    if (page.docTitle) document.title = page.docTitle;

    var heading = document.querySelector(".page-header .page-title");
    if (heading && page.heading) heading.textContent = page.heading;

    var desc = document.querySelector(".page-header .page-desc");
    if (desc && page.descHtml) desc.innerHTML = page.descHtml;

    var estimateTitle = document.querySelector(".order-summary .order-summary-title");
    if (estimateTitle && page.estimateTitle) estimateTitle.textContent = page.estimateTitle;

    var estimateNote = document.querySelector(".order-summary-note");
    if (estimateNote && page.estimateNote) estimateNote.textContent = page.estimateNote;

    var previewTitle = document.querySelector(".order-output .order-summary-title");
    if (previewTitle && page.previewTitle) previewTitle.textContent = page.previewTitle;

    if (copyBtn && page.copyLabel) copyBtn.textContent = page.copyLabel;
    if (sendXBtn && page.sendXLabel) sendXBtn.textContent = page.sendXLabel;
    if (sendDiscordBtn && page.sendDiscordLabel) sendDiscordBtn.textContent = page.sendDiscordLabel;
  }

  initOrderPageText();

  function parseAmount(text) {
    if (!text) return 0;
    var match = String(text).match(/([\d,]+)/);
    return match ? parseInt(match[1].replace(/,/g, ""), 10) : 0;
  }

  function formatWon(amount, variable) {
    return amount.toLocaleString("ko-KR") + (variable ? "원~" : "원");
  }

  function isVariablePrice(price) {
    return String(price || "").includes("~");
  }

  function hasVariableEstimate(selectedApis) {
    return selectedApis.some(function (entry) {
      if (entry.category === "api-custom") return true;
      if (isVariablePrice(entry.item && entry.item.price)) return true;
      return entry.options.some(function (option) {
        return (option.amount || 0) > 0;
      });
    });
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function createField(label, html) {
    return (
      '<div class="order-field">' +
        '<span class="order-label">' + escapeHtml(label) + "</span>" +
        html +
      "</div>"
    );
  }

  function createRadioGroup(name, items) {
    return (
      '<div class="order-choice-group">' +
        items.map(function (item, index) {
          return (
            '<label class="order-choice">' +
              '<input type="radio" name="' + name + '" value="' + item.id + '"' +
              (index === 0 ? " checked" : "") + ">" +
              "<span>" + escapeHtml(item.label) + "</span>" +
            "</label>"
          );
        }).join("") +
      "</div>"
    );
  }

  function createCheckbox(name, value, label, extraClass) {
    return (
      '<label class="order-choice' + (extraClass ? " " + extraClass : "") + '">' +
        '<input type="checkbox" name="' + name + '" value="' + escapeHtml(value) + '">' +
        "<span>" + escapeHtml(label) + "</span>" +
      "</label>"
    );
  }

  function formatOrderOptionLabel(label) {
    return String(label).replace(/ 가능$/, "");
  }

  function isOrderOption(option) {
    return !(typeof option === "object" && option.order === false);
  }

  function normalizeOption(option) {
    if (typeof option === "string") {
      return { type: "checkbox", label: formatOrderOptionLabel(option) };
    }
    var label = option.label + (option.price ? " " + option.price : "");
    return {
      type: option.quantity ? "quantity" : "checkbox",
      label: formatOrderOptionLabel(label),
      unitAmount: parseAmount(option.price || option.label)
    };
  }

  function createQuantityOption(apiId, optIndex, option) {
    var normalized = normalizeOption(option);
    var inputName = "option-qty-" + apiId + "-" + optIndex;
    return (
      '<div class="order-quantity-option">' +
        '<span class="order-quantity-label">' + escapeHtml(normalized.label) + "</span>" +
        '<div class="order-quantity-control">' +
          '<button type="button" class="order-qty-btn" data-qty-target="' + inputName + '" data-qty-step="-1" aria-label="수량 줄이기">−</button>' +
          '<input class="order-qty-input" type="number" name="' + inputName + '" min="0" max="99" value="0" inputmode="numeric">' +
          '<button type="button" class="order-qty-btn" data-qty-target="' + inputName + '" data-qty-step="1" aria-label="수량 늘리기">+</button>' +
        "</div>" +
      "</div>"
    );
  }

  function createApiBlock(categoryKey, categoryLabel, items) {
    if (!items.length) return "";

    var blocks = items.map(function (item, index) {
      var apiId = categoryKey + "-" + index;
      var options = item.options || [];
      var optionsHtml = options.length
        ? (function () {
          var quantityOptions = [];
          var checkboxOptions = [];

          options.forEach(function (option, optIndex) {
            if (!isOrderOption(option)) return;
            var normalized = normalizeOption(option);
            if (normalized.type === "quantity") {
              quantityOptions.push(createQuantityOption(apiId, optIndex, option));
              return;
            }
            checkboxOptions.push(
              createCheckbox(
                "option-" + apiId,
                String(optIndex),
                normalized.label,
                "order-choice--tag"
              )
            );
          });

          return (
            '<div class="order-api-options" data-api-options="' + apiId + '" hidden>' +
              '<p class="order-api-options-label">옵션 (필요한 것만 선택)</p>' +
              '<div class="order-option-list">' +
                quantityOptions.join("") +
                (checkboxOptions.length
                  ? '<div class="order-choice-group order-choice-group--wrap">' + checkboxOptions.join("") + "</div>"
                  : "") +
              "</div>" +
            "</div>"
          );
        })()
        : "";

      return (
        '<div class="order-api-item">' +
          '<label class="order-api-head">' +
            '<input type="checkbox" class="order-api-toggle" name="api" value="' + apiId + '" ' +
              'data-category="' + categoryKey + '" data-index="' + index + '">' +
            '<span class="order-api-name">' + escapeHtml(item.title) + "</span>" +
            '<span class="order-api-price">' + escapeHtml(item.price || "문의") + "</span>" +
          "</label>" +
          optionsHtml +
        "</div>"
      );
    }).join("");

    return (
      '<section class="order-section">' +
        '<h2 class="order-section-title">' + escapeHtml(categoryLabel) + "</h2>" +
        '<div class="order-api-list">' + blocks + "</div>" +
      "</section>"
    );
  }

  function buildForm() {
    var cfg = ORDER_CONFIG;
    var apiSections = cfg.categories.map(function (cat) {
      return createApiBlock(cat.key, cat.label, PRICE_ITEMS[cat.key] || []);
    }).join("");

    form.innerHTML =
      '<section class="order-section">' +
        '<h2 class="order-section-title">기본 정보</h2>' +
        createField("Warudo 버전", createRadioGroup("warudo", cfg.warudoVersions)) +
        createField(
          "방송 플랫폼",
          '<div class="order-choice-group order-choice-group--wrap">' +
            cfg.platforms.map(function (platform) {
              return createCheckbox("platform", platform.id, platform.label);
            }).join("") +
          "</div>"
        ) +
        createField("세팅 방식", createRadioGroup("setup", cfg.setupMethods)) +
      "</section>" +
      apiSections +
      '<section class="order-section">' +
        '<h2 class="order-section-title">추가 옵션</h2>' +
        '<div class="order-choice-group">' +
          createCheckbox("private", "yes", cfg.privateLabel, "order-choice--accent") +
        "</div>" +
        createField(
          "추가 요청사항",
          '<textarea class="order-textarea" name="note" rows="4" placeholder="원하시는 연출, 일정, 참고 자료 등"></textarea>'
        ) +
      "</section>";
  }

  function getCheckedLabels(name) {
    return Array.prototype.slice
      .call(form.querySelectorAll('input[name="' + name + '"]:checked'))
      .map(function (el) {
        var label = el.closest("label");
        return label ? label.querySelector("span").textContent.trim() : el.value;
      });
  }

  function getRadioLabel(name) {
    var checked = form.querySelector('input[name="' + name + '"]:checked');
    if (!checked) return "";
    var label = checked.closest("label");
    return label ? label.querySelector("span").textContent.trim() : checked.value;
  }

  function getSelectedApis() {
    return Array.prototype.slice.call(form.querySelectorAll(".order-api-toggle:checked")).map(function (el) {
      var category = el.dataset.category;
      var index = parseInt(el.dataset.index, 10);
      var item = (PRICE_ITEMS[category] || [])[index];
      var apiId = category + "-" + index;
      var options = [];

      (item.options || []).forEach(function (option, optIndex) {
        if (!isOrderOption(option)) return;
        var normalized = normalizeOption(option);
        if (normalized.type === "quantity") {
          var qtyInput = form.querySelector('[name="option-qty-' + apiId + "-" + optIndex + '"]');
          var qty = qtyInput ? parseInt(qtyInput.value, 10) || 0 : 0;
          if (qty > 0) {
            options.push({
              label: normalized.label,
              qty: qty,
              amount: normalized.unitAmount * qty
            });
          }
          return;
        }

        var optEl = form.querySelector(
          'input[name="option-' + apiId + '"][value="' + optIndex + '"]:checked'
        );
        if (optEl) {
          options.push({ label: normalized.label, qty: 1, amount: parseAmount(normalized.label) });
        }
      });

      return {
        category: category,
        item: item,
        options: options
      };
    });
  }

  function calculateEstimate(selectedApis, isPrivate) {
    var total = 0;
    selectedApis.forEach(function (entry) {
      if (!entry.item) return;
      total += parseAmount(entry.item.price);
      entry.options.forEach(function (option) {
        total += option.amount || 0;
      });
    });
    if (isPrivate) total += ORDER_CONFIG.privateFee;
    return total;
  }

  function formatSelectedOption(option) {
    if (option.qty > 1) {
      return option.label + " × " + option.qty + " (+" + formatWon(option.amount, true).replace("~", "") + "~)";
    }
    return option.label;
  }

  function buildPreviewText() {
    var note = form.elements.note ? form.elements.note.value.trim() : "";
    var warudo = getRadioLabel("warudo");
    var setup = getRadioLabel("setup");
    var platforms = getCheckedLabels("platform");
    var isPrivate = form.querySelector('input[name="private"]:checked');
    var selectedApis = getSelectedApis();
    var total = calculateEstimate(selectedApis, !!isPrivate);
    var lines = ["[Rabbi API 주문서]", ""];

    lines.push("■ Warudo: " + warudo);
    lines.push("■ 플랫폼: " + (platforms.length ? platforms.join(", ") : "(미선택)"));
    lines.push("■ 세팅: " + setup);
    lines.push("■ 비공개: " + (isPrivate ? "예 (+20,000원)" : "아니오"));
    lines.push("");
    lines.push("■ 신청 API");

    if (!selectedApis.length) {
      lines.push("- (미선택)");
    } else {
      selectedApis.forEach(function (entry) {
        lines.push("- " + entry.item.title + " (" + entry.item.price + ")");
        if (entry.item.desc) {
          lines.push("  " + entry.item.desc);
        }
        if (entry.options.length) {
          entry.options.forEach(function (option) {
            lines.push("  · " + formatSelectedOption(option));
          });
        }
      });
    }

    lines.push("");
    lines.push("■ 예상 견적: " + formatWon(total, hasVariableEstimate(selectedApis)));

    if (note) {
      lines.push("");
      lines.push("■ 추가 요청");
      lines.push(note);
    }

    return lines.join("\n");
  }

  function updateFormState() {
    Array.prototype.forEach.call(form.querySelectorAll(".order-api-toggle"), function (toggle) {
      var apiId = toggle.value;
      var optionsBox = form.querySelector('[data-api-options="' + apiId + '"]');
      if (!optionsBox) return;
      optionsBox.hidden = !toggle.checked;
      if (!toggle.checked) {
        Array.prototype.forEach.call(
          optionsBox.querySelectorAll('input[type="checkbox"]'),
          function (input) {
            input.checked = false;
          }
        );
        Array.prototype.forEach.call(
          optionsBox.querySelectorAll(".order-qty-input"),
          function (input) {
            input.value = "0";
          }
        );
      }
    });

    var selectedApis = getSelectedApis();
    var isPrivate = !!form.querySelector('input[name="private"]:checked');
    var total = calculateEstimate(selectedApis, isPrivate);
    var variableEstimate = hasVariableEstimate(selectedApis);

    estimate.textContent = formatWon(total, variableEstimate);
    preview.value = buildPreviewText();
  }

  function copyOrderText(done) {
    var text = preview.value;
    if (!text) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        if (done) done();
      });
      return;
    }

    preview.select();
    document.execCommand("copy");
    if (done) done();
  }

  function flashButton(btn, message, originalText) {
    btn.textContent = message;
    setTimeout(function () {
      btn.textContent = originalText;
    }, 1800);
  }

  function bindSendButton(btn, url, doneMessage, defaultLabel) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      copyOrderText(function () {
        window.open(url, "_blank", "noopener,noreferrer");
        flashButton(btn, doneMessage, defaultLabel);
      });
    });
  }

  function bindEvents() {
    form.addEventListener("change", updateFormState);
    form.addEventListener("input", updateFormState);

    form.addEventListener("click", function (event) {
      var btn = event.target.closest(".order-qty-btn");
      if (!btn) return;
      event.preventDefault();

      var targetName = btn.dataset.qtyTarget;
      var step = parseInt(btn.dataset.qtyStep, 10) || 0;
      var input = form.querySelector('[name="' + targetName + '"]');
      if (!input) return;

      var min = parseInt(input.min, 10) || 0;
      var max = parseInt(input.max, 10) || 99;
      var next = Math.min(max, Math.max(min, (parseInt(input.value, 10) || 0) + step));
      input.value = String(next);
      updateFormState();
    });

    copyBtn.addEventListener("click", function () {
      copyOrderText(function () {
        flashButton(copyBtn, "복사됨!", ORDER_PAGE.copyLabel || "클립보드에 복사");
      });
    });

    bindSendButton(
      sendXBtn,
      ORDER_CONFIG.contacts.twitter.send || ORDER_CONFIG.contacts.twitter.href,
      "복사 후 X 열림",
      ORDER_PAGE.sendXLabel || "보내기 (X)"
    );
    bindSendButton(
      sendDiscordBtn,
      ORDER_CONFIG.contacts.discord.send || ORDER_CONFIG.contacts.discord.href,
      "복사 후 Discord 열림",
      ORDER_PAGE.sendDiscordLabel || "보내기 (Discord)"
    );
  }

  buildForm();
  bindEvents();
  updateFormState();
})();
