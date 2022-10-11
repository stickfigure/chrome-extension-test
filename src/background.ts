import Tab = chrome.tabs.Tab;

let currentTab: Tab = null;

chrome.action.onClicked.addListener((tab) => {
	async function execute() {
		if (currentTab) {
			try {
				await chrome.tabs.update(currentTab.id, {active: true, highlighted: true});
				await chrome.windows.update(currentTab.windowId, {focused: true});
				return;
			} catch (e) {
				console.log('Tab missing, opening new');
			}
		}

		currentTab = await chrome.tabs.create({url: 'app.html', active: true});
	}

	execute();
});


console.log("ADDING LISTENER");
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log("GOT MESSAGE", message);
	return true;
});
