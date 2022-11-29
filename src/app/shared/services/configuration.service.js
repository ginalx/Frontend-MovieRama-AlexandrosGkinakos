import { apiService } from "./api.service.js";
import { referenceService } from "./reference.service.js";

/**
 * Configuration related apis
 * @namespace configurationService
 */
export const configurationService = (function () {
  /**
   * Fetches the configuration and stores the result in {@link referenceService}
   * @function
   * @alias configurationService.fetchConfiguration
   * @returns {Promise<object>} A promise of configuration properties
   */
  function fetchConfiguration() {
    return fetch(`${apiService.baseUrl}configuration${apiService.key}`)
      .then((res) => res.json())
      .then((res) => (referenceService.configuration = res));
  }

  return {
    fetchConfiguration,
  };
})();
