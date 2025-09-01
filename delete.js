(async function deleteTweetsAndReposts() {
  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  while (true) {
    // Find all 'More' buttons (3 dots)
    let moreButtons = document.querySelectorAll('button[aria-label="More"]');

    if (moreButtons.length === 0) {
      console.log("✅ No more tweets or reposts found. Scrolling...");
      window.scrollTo(0, document.body.scrollHeight);
      await delay(3000);
      continue;
    }

    for (let i = 0; i < moreButtons.length; i++) {
      moreButtons[i].click();
      await delay(1500); // Wait for menu to load

      // Find all menu items
      let menuItems = document.querySelectorAll('div[role="menuitem"] span');

      let deleteItem = Array.from(menuItems).find(el => el.innerText.includes("Delete"));
      let undoRepostItem = Array.from(menuItems).find(el => el.innerText.includes("Undo Repost") || el.innerText.includes("Undo Retweet"));

      if (deleteItem) {
        deleteItem.click();
        await delay(1500);

        let confirm = document.querySelector('div[data-testid="confirmationSheetConfirm"]');
        if (confirm) {
          confirm.click();
          console.log("🗑️ Tweet deleted...");
          await delay(2000);
        }
      } else if (undoRepostItem) {
        undoRepostItem.click();
        await delay(1500);

        let confirmUndo = document.querySelector('div[data-testid="confirmationSheetConfirm"]');
        if (confirmUndo) {
          confirmUndo.click();
          console.log("↩️ Repost undone...");
          await delay(2000);
        }
      } else {
        console.log("❌ No delete or undo repost option found. Skipping...");
      }

      // Close menu if still open
      document.body.click();
      await delay(1000);
    }

    // Scroll for more tweets
    window.scrollTo(0, document.body.scrollHeight);
    await delay(4000);
  }
})();
