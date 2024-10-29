const template = document.createElement("template");
template.innerHTML = `
<div id="container"></div>
`;

class TaskEmbedComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: "open"});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.render();
    }

    disconnectedCallback() {
    }

    render() {
        // attempt to get metadata tag
        const taskName = this.getAttribute('task-name') ? this.getAttribute('task-name') : null;
        
        // If a task name isn't provided, error out
        if (!taskName)
        {
            console.log("err: missing name");
            this.shadowRoot.querySelector(".flash-obj").innerHTML = `<h2>Embed fail. Provide a project name, please.</h2>`;
        }
        else // Otherwise, build the embed
        {
            let taskPath = ``;

            // Test hardware and provide appropriate build
            let userAgent = window.navigator.userAgent.toLowerCase(),
            macosPlatforms = /(macintosh|macintel|macppc|mac68k|macos)/i,
            windowsPlatforms = /(win32|win64|windows|wince)/i,
            iosPlatforms = /(iphone|ipad|ipod)/i,
            os = null;

            // Create flash embed
            taskPath = `../winMedia/${taskName}.swf`;
            window.RufflePlayer = window.RufflePlayer || {};
            window.addEventListener("load", (event) => {
                const ruffle = window.RufflePlayer.newest();
                const player = ruffle.createPlayer();
                const container = this.shadowRoot.getElementById("container");
                container.appendChild(player);
                player.load(taskPath).then(() => {
                    console.info("Ruffle successfully loaded the file");
                }).catch((e) => {
                    console.error(`Ruffle failed to load the file: ${e}`);
                });
            });
        }
    }
}

customElements.define('task-embed-component', TaskEmbedComponent);
        