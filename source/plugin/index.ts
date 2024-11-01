import * as process from "process"
import {BuilderKit, ConfigKit, ExcavationKit,} from "../foundation";
import {Logger} from "../utils/logger";
import {RaitonPlugin} from "./raiton";

// const __dirname__ = typeof __dirname == 'undefined' ? import.meta.dirname : __dirname;

export function visualkit() {
  const plugin = new RaitonPlugin(process.cwd());
  // let configLoaded: boolean = false;

  return {
    name: RaitonPlugin.identifier,

    async config() {
      await plugin.initialize();
    },

    configResolved(config: any) {
      plugin.configuration(config);
      plugin.caches();
      plugin.themes();
    },

    transformIndexHtml(html: string) {
      return html.replace(
        '</head>',
        `
    <link rel="stylesheet" href="/${RaitonPlugin.cachesDir}/globals.scss" /><link rel="stylesheet" href="/${RaitonPlugin.cachesDir}/theme.scss" /><script type="module" src="/${RaitonPlugin.cachesDir}/main.js" ></script>
</head>
`
      );
    },

    transform(src: string, id: string) {
      const root = ConfigKit.schematic.build?.directories?.root || process.cwd();

      if (ConfigKit.schematic.rules && !id.endsWith(`${RaitonPlugin.configFilename}`)) {

        const excavation = new ExcavationKit(id);
        if (excavation.accepted) {
          if (id.endsWith('.js') || id.endsWith('.ts') || id.endsWith('.json')) excavation.source(src);
          if (id.endsWith('.html') || id.endsWith('.htm') || id.endsWith('.txt') || id.endsWith('.svg')) excavation.htmlSource(src);

          excavation.begin().make().close()

          if (ConfigKit.schematic.build?.autoImports && id.startsWith(root) && excavation.builder.exported) {
            const generatedFilePath = BuilderKit.getExportFilename(id);
            const source = generatedFilePath.substring(root.length)
            const inject = `const vkStyle = document.createElement('link');
              vkStyle.rel = 'StyleSheet';
              ${ConfigKit.schematic.command == 'serve' ? `vkStyle.setAttribute('visualkit:style', '${id}')` : ''}
              vkStyle.href = \`${source}\`;
              document.head.appendChild(vkStyle); `;

            if (ConfigKit.schematic.build?.verbose) {
              Logger.highlight('[VISUALKIT]', Logger.getFileRelativePath(generatedFilePath), 'imported')
            }

            // configLoaded = true;
            return {code: `${inject}\n${src}`};
          }

        }
      }

      // if (!configLoaded && isScript) {
      //   configLoaded = true;
      //   return {code: src};
      // }
      return null;
    }
  }

}