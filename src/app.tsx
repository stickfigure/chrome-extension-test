import * as React from "react";
import * as ReactDOM from "react-dom";
import Tab = chrome.tabs.Tab;

let tab: Tab = null;

async function sendBack(): Promise<void> {
    console.log("starting");
    try {
        await chrome.runtime.sendMessage({foo: 'bar1'});
    } catch (e) {
        console.error(e);   // not called
    }
    console.log("this is never seen");
    await chrome.runtime.sendMessage({foo: 'bar2'});    // never executed
    console.log("definitely never seen");
}

async function doit() {
    try {
        await executeScript(tab, sendBack);
    } catch (e) {
        console.error(e);   // not called
    }
}

async function openit() {
    tab = await chrome.tabs.create({url: 'https://example.com/', active: false});
    await waitForTabLoad(tab);
}

function App({}) {
    return <div>
        <button onClick={openit}>openit</button>
        <button onClick={doit}>doit</button>
    </div>
}

ReactDOM.render(
    <App />,
    document.getElementById("app")
);

/**
 * Waits for the onUpdate 'complete' event
 */
export async function waitForTabLoad(tab: Tab): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const listener = (tabId, info) => {
            if (tab.id == tabId && info.status == 'complete') {
                chrome.tabs.onUpdated.removeListener(listener);
                resolve();
            }
        };
        chrome.tabs.onUpdated.addListener(listener);
    });
}

export async function executeScript(tab: Tab, func: () => void): Promise<any> {
    const result = await chrome.scripting.executeScript({target: {tabId: tab.id}, func: func});
    return result[0].result;
}
export async function executeScriptArgs(tab: Tab, func: (...args) => void, ...args: any[]): Promise<any> {
    const result = await chrome.scripting.executeScript({args: [args], target: {tabId: tab.id}, func: func});
    return result[0].result;
}
