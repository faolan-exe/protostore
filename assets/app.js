/* PROTOSTORE - protostore.eu
   Scrollfortschritt, Parallaxe, Sprachumschaltung, Benachrichtigung.
   Alle Bewegung ist an Scrollposition oder Zeiger gekoppelt, nichts laeuft in Dauerschleife. */

(function () {
  "use strict";

  var root = document.documentElement;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- Sprache ---------------- */

  var DICT = {
    de: {
      "nav.what": "Was kommt",
      "nav.signal": "Benachrichtigung",
      "nav.imprint": "Impressum",
      "nav.privacy": "Datenschutz",
      "h1.a": "ACHTUNG",
      "h1.b": "HIER ERSCHEINT WAS!",
      "hero.lead": "PROTOSTORE ist noch nicht da. Was du siehst, ist die Baustelle davor. Wir schneiden, plotten und löten gerade an einem Laden für Kleidung mit echten Motiven.",
      "cta.notify": "Sag mir Bescheid",
      "cta.peek": "Was hier entsteht",
      "scroll": "Weiter nach unten",
      "s2.eyebrow": "Der ehrliche Teil",
      "s2.statement": "Hier gibt es gerade <em>gar nichts</em> zu kaufen. Noch nicht.",
      "s2.p1": "Kein Warenkorb, keine Preisliste, keine Vorbestellung. Nur zwei Leute, ein Plotter, ein Lötkolben und ziemlich viele Ideen, die wir erst fertig machen wollen, bevor wir sie verkaufen.",
      "s2.p2": "Wenn der Laden aufmacht, steht es genau hier. Bis dahin bleibt diese Seite, was sie ist: eine Ankündigung.",
      "s3.eyebrow": "Der Plan",
      "s3.h2": "Drei Regale, randvoll geplant.",
      "s3.lead": "Das ist die Richtung. Die Details ändern sich noch, der Kern nicht.",
      "c1.h": "Kleidung mit Motiv",
      "c1.p": "Shirts, Hoodies, Longsleeves und Caps. Viele Motive, gedruckt und geplottet in kleinen Serien statt in Containern.",
      "c1.t1": "Shirts", "c1.t2": "Hoodies", "c1.t3": "Caps", "c1.t4": "Kleine Serien",
      "c2.h": "Plotten und Gestalten",
      "c2.p": "Flexfolie und Flockfolie für Textilien, dazu Vinyl für Aufkleber. Eigene Entwürfe genauso wie deine. Wir schneiden es, du trägst oder klebst es.",
      "c2.t1": "Flexfolie", "c2.t2": "Flockfolie", "c2.t3": "Vinyl Sticker", "c2.t4": "Eigene Motive",
      "c4.h": "Elektronik und Platinen",
      "c4.p": "Leiterplatten, Controller, Chips und Kabel. Keine Bausätze zum Selberlöten, sondern fertige Teile, die sofort laufen, dazu Datenblatt, Pinbelegung und Maße.",
      "c4.t1": "Platinen", "c4.t2": "Controller", "c4.t3": "Kabel", "c4.t4": "Dokumentiert",
      "s4.eyebrow": "Bleib dran",
      "s4.h2": "Einmal Bescheid geben, wenn es losgeht.",
      "s4.p": "Kein Newsletter, keine Datenbank, kein Tracking. Der Knopf öffnet nur dein Mailprogramm mit einer fertigen Nachricht an uns. Wir schreiben dir zum Start und danach nie wieder.",
      "form.ph": "deine@adresse.de",
      "form.btn": "Nachricht vorbereiten",
      "form.bad": "Diese Adresse sieht noch nicht richtig aus.",
      "form.ok": "Dein Mailprogramm sollte sich jetzt öffnen. Abschicken nicht vergessen.",
      "form.note": "Falls sich nichts öffnet, schreib einfach direkt an kontakt@protostore.eu.",
      "social.h": "Wo du uns sonst findest",
      "social.note": "Überall der gleiche Name. Wo wir nicht stehen, sind wir auch nicht.",
      "social.dc": "Discord Namen kopieren, protostore.eu",
      "social.copied": "kopiert",  /* wird hinter den Namen gehaengt */
      "foot.made": "Gebaut in Mühlheim am Main.",
      "foot.rights": "Alle Inhalte dieser Seite gehören den Betreibern.",
      "legal.back": "Zur Startseite",
      "pre.aria": "Du hast ein Teil von uns gesehen, frag vorab an",
      "pre.s1": "SHIRT",
      "pre.s2": "GESEHEN?",
      "pre.eyebrow": "Ausnahme",
      "pre.h": "Du hast eins in echt gesehen?",
      "pre.p": "Wenn du hier gelandet bist, weil dir eins unserer Teile über den Weg gelaufen ist: schreib uns. Wir schauen, ob wir dir vorab etwas extra drucken, bevor der Laden offiziell aufmacht.",
      "pre.btn": "Vorab anfragen",
      "pre.close": "Schließen"
    },
    en: {
      "nav.what": "What is coming",
      "nav.signal": "Get notified",
      "nav.imprint": "Legal notice",
      "nav.privacy": "Privacy",
      "h1.a": "ACHTUNG",
      "h1.b": "HIER ERSCHEINT WAS!",
      "hero.lead": "PROTOSTORE does not exist yet. What you see is the construction site in front of it. We are cutting, plotting and soldering our way towards a shop for clothing with real artwork.",
      "cta.notify": "Tell me when it opens",
      "cta.peek": "What we are building",
      "scroll": "Keep scrolling",
      "s2.eyebrow": "The honest part",
      "s2.statement": "There is <em>nothing</em> to buy here right now. Not yet.",
      "s2.p1": "No cart, no price list, no pre orders. Just two people, a cutting plotter, a soldering iron and a lot of ideas we want to finish before we sell them.",
      "s2.p2": "When the shop opens, it will say so right here. Until then this page stays what it is: an announcement.",
      "s3.eyebrow": "The plan",
      "s3.h2": "Three shelves, already full in our heads.",
      "s3.lead": "This is the direction. Details will shift, the core will not.",
      "c1.h": "Clothing with artwork",
      "c1.p": "Shirts, hoodies, longsleeves and caps. Lots of designs, printed and plotted in small runs instead of shipping containers.",
      "c1.t1": "Shirts", "c1.t2": "Hoodies", "c1.t3": "Caps", "c1.t4": "Small runs",
      "c2.h": "Plotting and design",
      "c2.p": "Flex and flock film for textiles, plus vinyl for stickers. Our own designs and yours as well. We cut it, you wear it or stick it on.",
      "c2.t1": "Flex film", "c2.t2": "Flock film", "c2.t3": "Vinyl stickers", "c2.t4": "Your artwork",
      "c4.h": "Electronics and boards",
      "c4.p": "Circuit boards, controllers, chips and cables. No solder it yourself kits, but finished parts that just work, with datasheet, pinout and dimensions.",
      "c4.t1": "Boards", "c4.t2": "Controllers", "c4.t3": "Cables", "c4.t4": "Documented",
      "s4.eyebrow": "Stay in the loop",
      "s4.h2": "One message from us when it goes live.",
      "s4.p": "No newsletter, no database, no tracking. The button only opens your mail app with a ready made message to us. We write once at launch and never again.",
      "form.ph": "your@address.com",
      "form.btn": "Prepare message",
      "form.bad": "That address does not look right yet.",
      "form.ok": "Your mail app should be opening now. Do not forget to send it.",
      "form.note": "If nothing opens, just write to kontakt@protostore.eu directly.",
      "social.h": "Where else to find us",
      "social.note": "Same name everywhere. If a channel is not listed, we are not on it.",
      "social.dc": "Copy our Discord name, protostore.eu",
      "social.copied": "copied",
      "foot.made": "Built in Mühlheim am Main, Germany.",
      "foot.rights": "All content on this page belongs to the operators.",
      "legal.back": "Back to the start page",
      "pre.aria": "You saw one of our pieces, ask for an early one",
      "pre.s1": "SEEN A",
      "pre.s2": "SHIRT?",
      "pre.eyebrow": "Exception",
      "pre.h": "Saw one out in the wild?",
      "pre.p": "If you ended up here because one of our pieces crossed your path, write to us. We will check whether we can print you something early, before the shop officially opens.",
      "pre.btn": "Ask for an early one",
      "pre.close": "Close"
    }
  };

  function detect() {
    var saved = null;
    try { saved = localStorage.getItem("protostore.lang"); } catch (e) {}
    if (saved === "de" || saved === "en") return saved;
    var list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "de"];
    for (var i = 0; i < list.length; i++) {
      var code = String(list[i]).toLowerCase();
      if (code.indexOf("de") === 0) return "de";
      if (code.indexOf("en") === 0) return "en";
    }
    return "en";
  }

  var lang = detect();

  function applyLang(next) {
    lang = next;
    root.setAttribute("lang", next);
    try { localStorage.setItem("protostore.lang", next); } catch (e) {}

    var table = DICT[next] || DICT.de;

    var nodes = document.querySelectorAll("[data-i18n]");
    for (var i = 0; i < nodes.length; i++) {
      var key = nodes[i].getAttribute("data-i18n");
      if (Object.prototype.hasOwnProperty.call(table, key)) nodes[i].innerHTML = table[key];
    }

    var attrs = document.querySelectorAll("[data-i18n-attr]");
    for (var j = 0; j < attrs.length; j++) {
      var spec = attrs[j].getAttribute("data-i18n-attr").split("|");
      for (var s = 0; s < spec.length; s++) {
        var pair = spec[s].split(":");
        if (pair.length === 2 && Object.prototype.hasOwnProperty.call(table, pair[1])) {
          attrs[j].setAttribute(pair[0], table[pair[1]]);
        }
      }
    }

    var blocks = document.querySelectorAll("[data-lang]");
    for (var b = 0; b < blocks.length; b++) {
      blocks[b].hidden = blocks[b].getAttribute("data-lang") !== next;
    }

    var titleNode = document.querySelector("[data-title-de]");
    if (titleNode) {
      document.title = titleNode.getAttribute(next === "de" ? "data-title-de" : "data-title-en");
    }

    var de = document.querySelector(".lang .de");
    var en = document.querySelector(".lang .en");
    if (de && en) {
      de.classList.toggle("off", next !== "de");
      en.classList.toggle("off", next !== "en");
    }
  }

  var toggle = document.querySelector(".lang");
  if (toggle) {
    toggle.addEventListener("click", function () {
      applyLang(lang === "de" ? "en" : "de");
    });
  }
  applyLang(lang);

  /* ---------------- Scrollfortschritt, hell nach dunkel ---------------- */

  var ticking = false;
  var floaters = Array.prototype.slice.call(document.querySelectorAll(".floater"));
  var themeMeta = document.querySelector('meta[name="theme-color"]');
  var dark = null;

  function measure() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var y = window.scrollY || window.pageYOffset || 0;
    var p = max > 0 ? y / max : 0;

    /* Wechsel ab der Seitenhaelfte, die Blende macht style.css, beim Scrollen bleibt kein Mittelgrau stehen */
    var nextDark = p >= 0.5;
    if (nextDark !== dark) {
      dark = nextDark;
      root.style.setProperty("--p", dark ? "1" : "0");
      root.style.colorScheme = dark ? "dark" : "light";
      if (themeMeta) themeMeta.setAttribute("content", dark ? "#05060a" : "#f4f4f6");
    }

    if (!reduce) {
      for (var i = 0; i < floaters.length; i++) {
        var el = floaters[i];
        var speed = parseFloat(el.getAttribute("data-speed") || "0.1");
        var spin = parseFloat(el.getAttribute("data-spin") || "0");
        var scale = parseFloat(el.getAttribute("data-scale") || "1");
        el.style.transform =
          "translate3d(" + (el._px || 0).toFixed(2) + "px," +
          (-y * speed + (el._py || 0)).toFixed(2) + "px,0) rotate(" +
          (spin + y * speed * 0.05).toFixed(3) + "deg) scale(" + scale + ")";
      }
    }
    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(measure);
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* Zeigerparallaxe: nur im Hero, nur solange der Zeiger sich bewegt */
  var hero = document.querySelector(".hero");
  if (hero && !reduce && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("mousemove", function (ev) {
      var rect = hero.getBoundingClientRect();
      var dx = (ev.clientX - rect.width / 2) / rect.width;
      var dy = (ev.clientY - rect.height / 2) / rect.height;
      for (var i = 0; i < floaters.length; i++) {
        var depth = parseFloat(floaters[i].getAttribute("data-depth") || "10");
        floaters[i]._px = dx * depth;
        floaters[i]._py = dy * depth * 0.6;
      }
      onScroll();
    });
    hero.addEventListener("mouseleave", function () {
      for (var i = 0; i < floaters.length; i++) { floaters[i]._px = 0; floaters[i]._py = 0; }
      onScroll();
    });
  }

  measure();

  /* ---------------- Einblenden ---------------- */

  var rises = document.querySelectorAll(".rise");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: "0px 0px -12% 0px", threshold: 0.12 });
    for (var r = 0; r < rises.length; r++) io.observe(rises[r]);
  } else {
    for (var q = 0; q < rises.length; q++) rises[q].classList.add("in");
  }

  /* ---------------- Benachrichtigung per Mail ---------------- */

  var form = document.getElementById("notify");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var input = form.querySelector("input");
      var out = document.getElementById("formnote");
      var value = (input.value || "").trim();
      var table = DICT[lang] || DICT.de;

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
        out.textContent = table["form.bad"];
        input.focus();
        return;
      }

      var subject = lang === "de" ? "Bitte bei Start benachrichtigen" : "Please notify me at launch";
      var body = (lang === "de"
        ? "Hallo PROTOSTORE,\n\nbitte sagt mir Bescheid, sobald der Shop offen ist.\n\nMeine Adresse: "
        : "Hello PROTOSTORE,\n\nplease let me know as soon as the shop is open.\n\nMy address: ") + value + "\n";

      window.location.href = "mailto:kontakt@protostore.eu?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);

      out.textContent = table["form.ok"];
    });
  }

  /* ---------------- Discord Name kopieren ---------------- */

  var dcCopy = document.getElementById("dc-copy");
  var dcLabel = document.getElementById("dc-label");

  if (dcCopy && dcLabel) {
    var dcName = dcCopy.getAttribute("data-copy");
    var dcBase = dcLabel.textContent;
    var dcTimer = null;

    dcCopy.addEventListener("click", function () {
      function done() {
        var table = DICT[lang] || DICT.de;
        dcLabel.textContent = dcName + " " + table["social.copied"];
        dcCopy.classList.add("ok");
        if (dcTimer) window.clearTimeout(dcTimer);
        dcTimer = window.setTimeout(function () {
          dcLabel.textContent = dcBase;
          dcCopy.classList.remove("ok");
          dcTimer = null;
        }, 1800);
      }

      /* Klappt das Kopieren nicht, bleibt wenigstens der Name lesbar stehen */
      function fail() {
        if (dcTimer) { window.clearTimeout(dcTimer); dcTimer = null; }
        dcLabel.textContent = dcName;
        dcCopy.classList.add("ok");
      }

      function fallback() {
        var tmp = document.createElement("input");
        tmp.value = dcName;
        tmp.setAttribute("aria-hidden", "true");
        tmp.style.cssText = "position:fixed;top:0;left:0;opacity:0";
        document.body.appendChild(tmp);
        tmp.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(tmp);
        if (ok) { done(); } else { fail(); }
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(dcName).then(done, fallback);
      } else {
        fallback();
      }
    });
  }

  /* ---------------- Vorab Anfrage, Aufkleber ---------------- */

  var pre = document.getElementById("pre");
  var preToggle = document.getElementById("pre-toggle");
  var prePop = document.getElementById("pre-pop");
  var preMail = document.getElementById("pre-mail");

  if (pre && preToggle && prePop && preMail) {
    var preTimer = null;

    function preHref() {
      var subject = lang === "de"
        ? "Vorab Anfrage, ich habe ein Teil von euch gesehen"
        : "Early request, I saw one of your pieces";
      var body = lang === "de"
        ? "Hallo PROTOSTORE,\n\nich habe eins eurer Teile in echt gesehen und h\u00e4tte gern auch eins, bevor ihr offiziell startet.\n\nMotiv: \nGesehen bei: \nGr\u00f6\u00dfe: \n"
        : "Hello PROTOSTORE,\n\nI saw one of your pieces in the wild and would like one too, before you officially open.\n\nArtwork: \nSeen on: \nSize: \n";
      return "mailto:kontakt@protostore.eu?subject=" +
        encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
    }

    function preOpen(on) {
      preToggle.setAttribute("aria-expanded", on ? "true" : "false");
      if (preTimer) { window.clearTimeout(preTimer); preTimer = null; }

      if (on) {
        preMail.setAttribute("href", preHref());
        prePop.hidden = false;
        if (reduce) {
          prePop.classList.add("open");
        } else {
          window.requestAnimationFrame(function () {
            window.requestAnimationFrame(function () { prePop.classList.add("open"); });
          });
        }
        return;
      }

      prePop.classList.remove("open");
      if (reduce) {
        prePop.hidden = true;
      } else {
        preTimer = window.setTimeout(function () {
          if (preToggle.getAttribute("aria-expanded") === "false") prePop.hidden = true;
          preTimer = null;
        }, 300);
      }
    }

    preToggle.addEventListener("click", function () {
      preOpen(preToggle.getAttribute("aria-expanded") !== "true");
    });

    var preClose = document.getElementById("pre-close");
    if (preClose) {
      preClose.addEventListener("click", function () {
        preOpen(false);
        preToggle.focus();
      });
    }

    document.addEventListener("click", function (ev) {
      if (preToggle.getAttribute("aria-expanded") !== "true") return;
      if (!pre.contains(ev.target)) preOpen(false);
    });

    document.addEventListener("keydown", function (ev) {
      if (ev.key !== "Escape" && ev.keyCode !== 27) return;
      if (preToggle.getAttribute("aria-expanded") !== "true") return;
      preOpen(false);
      preToggle.focus();
    });
  }
})();
