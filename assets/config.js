// Gedeelde configuratie voor beide pagina's.
// Analytics is bewust niet gekoppeld: window.FRONTPOCKET_ANALYTICS.track wordt
// aangeroepen op vier momenten (check_gestart, check_afgerond, grootste_lek,
// calendly_click). Als er later een tool wordt gekozen (bv. Plausible),
// vervang je de no-op onderin.
(function(){
  "use strict";

  window.FRONTPOCKET_CONFIG = {
    calendlyUrl: "https://calendly.com/rene-ias17/new-meeting"
  };

  window.FRONTPOCKET_ANALYTICS = window.FRONTPOCKET_ANALYTICS || {
    track: function(/* naam, extra */){ /* no-op tot analytics gekozen is */ }
  };
})();
