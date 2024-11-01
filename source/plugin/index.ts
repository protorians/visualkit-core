import * as process from "process"
import {ConfigKit, ExcavationKit,} from "../foundation";
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

      // <script type="module" src="${pkgRoot}${path.sep}..${path.sep}library${path.sep}appearance.scss"></script>
      // <script type="module" src="${pkgRoot}${path.sep}main.js"></script>

      return html.replace(
        '</head>',
        `
        <link rel="stylesheet" href="/${RaitonPlugin.cachesDir}/globals.scss" />
        <link rel="stylesheet" href="/${RaitonPlugin.cachesDir}/theme.scss" />
        <script type="module" src="/${RaitonPlugin.cachesDir}/main.js" ></script>
        </head>`
      );
    },

    // buildStart() {
    //   Logger.notice('BuildStart', 'Processing');
    // },
    //
    // handleHotUpdate() {
    //   Logger.notice('handleHotUpdate', 'Processing');
    // },
    //
    // buildEnd() {
    //   Logger.notice('buildEnd', 'Processing');
    // },

    transform(src: string, id: string) {
      const root = ConfigKit.schematic.build?.directories?.root || process.cwd()
      // const isScript = id.endsWith('.js') || id.endsWith('.ts') || id.endsWith('.jsx') || id.endsWith('.tsx')

      // if (!configLoaded && isScript) {
      //   src = `${plugin.required()}\n${src}`;
      // }

      if (ConfigKit.schematic.rules && !id.endsWith(`${RaitonPlugin.configFilename}`)) {

        const excavation = new ExcavationKit(id);
        if (excavation.accepted) {
          if (id.endsWith('.js') || id.endsWith('.ts') || id.endsWith('.json')) excavation.source(src);
          if (id.endsWith('.html') || id.endsWith('.htm') || id.endsWith('.txt') || id.endsWith('.svg')) excavation.htmlSource(src);
          excavation.make()

          if (ConfigKit.schematic.build?.autoImports && id.startsWith(root) && excavation.builder.exported) {
            const generatedFilePath = excavation.builder.getExportFilename(id);
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