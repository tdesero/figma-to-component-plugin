export function TailwindIFrame({ html }) {
    // Strangest thing ever: this script tag needs to be encoded because otherwise "npm run watch" will break the plugin somehow...
    const tailwindScriptCDNScript = '%3Cscript%20src%3D%22https%3A%2F%2Fcdn.tailwindcss.com%22%3E%3C%2Fscript%3E';
    
    const preview = `<div style="padding: 16px">${html}</div>`;

    //Note: I needed to render the iframe as innerHTML and not a react component, otherwise tailwind wouldn't have loaded
    const iframeCode = `<iframe class="preview-iframe__iframe" src="data:text/html,${tailwindScriptCDNScript}${encodeURIComponent(preview)}"></iframe>`

    return (<div className="preview-iframe" dangerouslySetInnerHTML={{ __html: iframeCode}}></div>)
}