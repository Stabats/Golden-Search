/* ==================================================================== */
/* Import Charadex
======================================================================= */
import { charadex } from '../charadex.js';


/* ==================================================================== */
/* Load
======================================================================= */
document.addEventListener("DOMContentLoaded", async () => {

  let dex = await charadex.initialize.page(
    null,
    charadex.page.inventory,
    null, 
    async (listData) => {

      if (listData.type == 'profile') {

        let profile = listData.profileArray[0];

        // Inventory
        charadex.initialize.groupGallery(
          charadex.page.inventory.inventoryConfig,
          await charadex.manageData.inventoryFix(profile),
          'type',
          charadex.url.getPageUrl('items')
        )

        // Designs
        if (charadex.tools.checkArray(profile.masterlist)) {
          let designs = await charadex.initialize.page(
            profile.masterlist,
            charadex.page.inventory.relatedData['masterlist'],
          );
        }

        // Logs
        if (charadex.tools.checkArray(profile.inventoryLog)) {
          let logs = await charadex.initialize.page(
            profile.inventoryLog,
            charadex.page.inventory.relatedData['inventoryLog'],
          );
        }

      }
    }
  );
  
  charadex.tools.loadPage('.softload', 500);
  
});
