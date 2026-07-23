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

    if (copyBtn && page.copyLabel) {
      copyBtn.textContent = page.copyLabel;
      copyBtn.style.minWidth = copyBtn.offsetWidth + "px";
    }
    if (sendXBtn && page.sendXIcon) renderSendButton(sendXBtn, page.sendLabel, page.sendXIcon, page.sendXAriaLabel);
    if (sendDiscordBtn && page.sendDiscordIcon) {
      renderSendButton(sendDiscordBtn, page.sendLabel, page.sendDiscordIcon, page.sendDiscordAriaLabel);
    }
  }

  function renderSendButton(btn, label, iconHtml, ariaLabel) {
    if (!btn) return;
    btn.classList.add("order-action-btn--with-icon");
    btn.setAttribute("aria-label", ariaLabel || label);
    btn.innerHTML =
      '<span class="order-action-btn__text">' + (label || "보내기") + "</span>" + iconHtml;
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
      return isVariablePrice(entry.item && entry.item.price);
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
    var defaultId = (items.find(function (item) { return item.default; }) || items[0]).id;
    return (
      '<div class="order-choice-group">' +
        items.map(function (item) {
          return (
            '<label class="order-choice">' +
              '<input type="radio" name="' + name + '" value="' + item.id + '"' +
              (item.id === defaultId ? " checked" : "") + ">" +
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

  function formatOrderPrice(price) {
    if (!price) return "문의";
    var text = String(price);
    if (text.includes("문의")) return text;
    if (text.includes("~")) return text.replace(/~$/, "") + "원~";
    if (!/[\d]/.test(text)) return text;
    return text + "원";
  }

  function createQuantityControl(inputName) {
    return (
      '<div class="order-quantity-control">' +
        '<button type="button" class="order-qty-btn" data-qty-target="' + inputName + '" data-qty-step="-1" aria-label="수량 줄이기">−</button>' +
        '<input class="order-qty-input" type="number" name="' + inputName + '" min="0" max="99" value="0" inputmode="numeric">' +
        '<button type="button" class="order-qty-btn" data-qty-target="' + inputName + '" data-qty-step="1" aria-label="수량 늘리기">+</button>' +
      "</div>"
    );
  }

  function createPropPurchaseSection() {
    var cfg = ORDER_CONFIG.propPurchase;
    if (!cfg) return "";

    return (
      '<section class="order-section">' +
        '<h2 class="order-section-title">' + escapeHtml(cfg.title) + "</h2>" +
        '<div class="order-prop-simple">' +
          '<span class="order-prop-note">' + escapeHtml(cfg.unitLabel) + "</span>" +
          createQuantityControl("prop-qty") +
        "</div>" +
      "</section>"
    );
  }

  function createVariantOptions(apiId, variants) {
    if (!variants || !variants.length) return "";

    return (
      '<div class="order-api-options" data-api-variants="' + apiId + '" hidden>' +
        '<p class="order-api-options-label">타입 (필요한 것만 선택)</p>' +
        '<div class="order-variant-list">' +
          variants
            .map(function (variant, variantIndex) {
              var displayLabel = variant.label || variant.desc || "";
              return (
                '<label class="order-variant-choice">' +
                  '<input type="checkbox" name="variant-' + apiId + '" value="' + variantIndex + '">' +
                  '<span class="order-variant-body">' +
                    (variant.label
                      ? '<span class="order-variant-label">' + escapeHtml(variant.label) + "</span>" +
                        (variant.desc
                          ? '<span class="order-variant-desc">' + escapeHtml(variant.desc) + "</span>"
                          : "")
                      : '<span class="order-variant-label">' + escapeHtml(displayLabel) + "</span>") +
                  "</span>" +
                "</label>"
              );
            })
            .join("") +
        "</div>" +
      "</div>"
    );
  }

  function createApiBlock(categoryKey, categoryLabel, items) {
    if (!items.length) return "";

    var blocks = items.map(function (item, index) {
      var apiId = categoryKey + "-" + index;
      var variantsHtml = item.variants && item.variants.length
        ? createVariantOptions(apiId, item.variants)
        : "";

      return (
        '<div class="order-api-item">' +
          '<label class="order-api-head">' +
            '<input type="checkbox" class="order-api-toggle" name="api" value="' + apiId + '" ' +
              'data-category="' + categoryKey + '" data-index="' + index + '"' +
              (item.variants && item.variants.length ? ' data-has-variants="true"' : "") + ">" +
            '<span class="order-api-info">' +
              '<span class="order-api-name">' + escapeHtml(item.title) + "</span>" +
              (item.desc ? '<span class="order-api-desc">' + escapeHtml(item.desc) + "</span>" : "") +
            "</span>" +
            '<span class="order-api-price">' + escapeHtml(formatOrderPrice(item.price)) + "</span>" +
          "</label>" +
          variantsHtml +
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
          '<div class="order-platform-field">' +
            '<div class="order-choice-group order-choice-group--wrap">' +
              cfg.platforms.map(function (platform) {
                return createCheckbox("platform", platform.id, platform.label);
              }).join("") +
            "</div>" +
            '<input class="order-input order-platform-other" type="text" name="platform-other" placeholder="' +
              escapeHtml(cfg.platformOtherPlaceholder || "없음 · 기타 플랫폼 직접 입력") +
            '">' +
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
          "요청사항",
          '<textarea class="order-textarea" name="note" rows="4" placeholder="원하시는 연출, 일정, 참고 자료 등"></textarea>'
        ) +
      "</section>" +
      createPropPurchaseSection();
  }

  function getPlatformLabels() {
    var platforms = getCheckedLabels("platform");
    var otherInput = form.elements["platform-other"];
    var other = otherInput ? otherInput.value.trim() : "";
    if (other) platforms.push(other);
    return platforms;
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

  function getSelectedVariants(apiId, item) {
    if (!item.variants || !item.variants.length) return [];
    return Array.prototype.slice
      .call(form.querySelectorAll('input[name="variant-' + apiId + '"]:checked'))
      .map(function (el) {
        var index = parseInt(el.value, 10);
        return item.variants[index];
      })
      .filter(Boolean);
  }

  function getSelectedApis() {
    return Array.prototype.slice.call(form.querySelectorAll(".order-api-toggle:checked")).map(function (el) {
      var category = el.dataset.category;
      var index = parseInt(el.dataset.index, 10);
      var item = (PRICE_ITEMS[category] || [])[index];
      var apiId = category + "-" + index;
      return {
        category: category,
        item: item,
        variants: getSelectedVariants(apiId, item)
      };
    });
  }

  function getPropPurchase() {
    var cfg = ORDER_CONFIG.propPurchase;
    if (!cfg) return null;

    var input = form.querySelector('[name="prop-qty"]');
    var qty = input ? parseInt(input.value, 10) || 0 : 0;
    if (qty <= 0) return null;

    return {
      qty: qty,
      amount: cfg.unitPrice * qty
    };
  }

  function calculateEstimate(selectedApis, isPrivate, propPurchase) {
    var total = 0;
    selectedApis.forEach(function (entry) {
      if (!entry.item) return;
      total += parseAmount(entry.item.price);
    });
    if (propPurchase) total += propPurchase.amount;
    if (isPrivate) total += ORDER_CONFIG.privateFee;
    return total;
  }

  function buildPreviewText() {
    var note = form.elements.note ? form.elements.note.value.trim() : "";
    var warudo = getRadioLabel("warudo");
    var setup = getRadioLabel("setup");
    var platforms = getPlatformLabels();
    var isPrivate = form.querySelector('input[name="private"]:checked');
    var selectedApis = getSelectedApis();
    var propPurchase = getPropPurchase();
    var total = calculateEstimate(selectedApis, !!isPrivate, propPurchase);
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
        lines.push("- " + entry.item.title + " (" + formatOrderPrice(entry.item.price) + ")");
        if (entry.variants && entry.variants.length) {
          entry.variants.forEach(function (variant) {
            lines.push("  · " + (variant.label || variant.desc));
          });
        } else if (entry.item.desc) {
          lines.push("  " + entry.item.desc);
        }
      });
    }

    lines.push("");
    if (propPurchase) {
      lines.push("■ 소품 (PROP)");
      lines.push(
        "- " + propPurchase.qty + "개 (" + formatWon(propPurchase.amount, false) + ")"
      );
      lines.push("");
    }
    lines.push("■ 예상 견적: " + formatWon(total, hasVariableEstimate(selectedApis)));

    if (note) {
      lines.push("");
      lines.push("■ 요청사항");
      lines.push(note);
    }

    return lines.join("\n");
  }

  function updateFormState() {
    Array.prototype.forEach.call(form.querySelectorAll(".order-api-toggle"), function (toggle) {
      var apiId = toggle.value;
      var variantBox = form.querySelector('[data-api-variants="' + apiId + '"]');
      if (!variantBox) return;
      variantBox.hidden = !toggle.checked;
      if (!toggle.checked) {
        Array.prototype.forEach.call(
          variantBox.querySelectorAll('input[type="checkbox"]'),
          function (input) {
            input.checked = false;
          }
        );
      }
    });

    var selectedApis = getSelectedApis();
    var propPurchase = getPropPurchase();
    var isPrivate = !!form.querySelector('input[name="private"]:checked');
    var total = calculateEstimate(selectedApis, isPrivate, propPurchase);
    var variableEstimate = hasVariableEstimate(selectedApis);

    estimate.textContent = formatWon(total, variableEstimate);
    preview.value = buildPreviewText();
  }

  function copyOrderText(done) {
    var text = preview.value;
    if (!text) {
      if (done) done(false);
      return;
    }

    function finish(ok) {
      if (done) done(ok !== false);
    }

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () {
        finish(true);
      }).catch(function () {
        preview.select();
        try {
          document.execCommand("copy");
        } catch (error) {
          finish(false);
          return;
        }
        finish(true);
      });
      return;
    }

    preview.select();
    try {
      document.execCommand("copy");
      finish(true);
    } catch (error) {
      finish(false);
    }
  }

  function flashButton(btn, message, restore) {
    btn.textContent = message;
    setTimeout(function () {
      if (typeof restore === "function") restore();
      else btn.textContent = restore;
    }, 1800);
  }

  function bindSendButton(btn, url, doneMessage, restore) {
    if (!btn) return;
    btn.addEventListener("click", function () {
      var text = preview.value;
      if (!text) return;

      var opened = window.open(url, "_blank", "noopener,noreferrer");
      if (!opened) window.location.assign(url);

      copyOrderText(function () {
        flashButton(btn, doneMessage, restore);
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
        flashButton(
          copyBtn,
          ORDER_PAGE.copyDoneLabel || "복사 완료!",
          ORDER_PAGE.copyLabel || "주문서 복사"
        );
      });
    });

    bindSendButton(
      sendXBtn,
      ORDER_CONFIG.contacts.twitter.send || ORDER_CONFIG.contacts.twitter.href,
      "복사 후 X 열림",
      function () {
        renderSendButton(
          sendXBtn,
          ORDER_PAGE.sendLabel,
          ORDER_PAGE.sendXIcon,
          ORDER_PAGE.sendXAriaLabel
        );
      }
    );
    bindSendButton(
      sendDiscordBtn,
      ORDER_CONFIG.contacts.discord.send || ORDER_CONFIG.contacts.discord.href,
      "복사 후 Discord 열림",
      function () {
        renderSendButton(
          sendDiscordBtn,
          ORDER_PAGE.sendLabel,
          ORDER_PAGE.sendDiscordIcon,
          ORDER_PAGE.sendDiscordAriaLabel
        );
      }
    );
  }

  buildForm();
  bindEvents();
  updateFormState();
})();
