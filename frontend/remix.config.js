const path = require('path');
const minimatch = require('minimatch');
const fs = require('fs');

const defaultOptions = {
  appDir: 'app',
  routeDir: 'routes',
  basePath: '/',
  paramPrefixChar: '$',
  routeRegex:
    /(([+][\/][^\/:?]+)|\/)((index|route|layout|page)|(_[^\/:?]+)|([^\/:?*]+.((ts|tsx|js|jsx|md|mdx)|tsx)))$$/,
};
const defaultDefineRoutes = undefined;

const BASE_PATH = '/pb';

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: ['*/**'],
  serverDependenciesToBundle: [
    "crypto-random-string",
    /@ant-design\/*/,
    /@antv\/*/,
    /d3-interpolate/,
    /d3-color/,
    /lodash-es/,
  ],
  // devServerPort: 8002,
  publicPath: '/__remix__/build/',
  assetsBuildDirectory: 'public/__remix__/build/',
  routes: async (defineRoutes) => {
    return flatRoutes('routes', defineRoutes, {
      basePath: BASE_PATH,
    });
  },
  future: {
    v2_meta: true,
  },
};

function flatRoutes(routeDir, defineRoutes, options = {}) {
  const routes = _flatRoutes(
    options.appDir ?? defaultOptions.appDir,
    options.ignoredRouteFiles ?? [],
    {
      ...defaultOptions,
      ...options,
      routeDir,
      defineRoutes,
    },
  );
  // update undefined parentIds to 'root'
  Object.values(routes).forEach((route) => {
    if (route.parentId === undefined) {
      route.parentId = 'root';
    }
  });

  return routes;
}

function _flatRoutes(appDir, ignoredFilePatternsOrOptions, options) {
  // get options
  let ignoredFilePatterns = [];
  if (ignoredFilePatternsOrOptions && !Array.isArray(ignoredFilePatternsOrOptions)) {
    options = ignoredFilePatternsOrOptions;
  } else {
    ignoredFilePatterns = ignoredFilePatternsOrOptions ?? [];
  }
  if (!options) {
    options = defaultOptions;
  }

  let routeMap = new Map();
  let nameMap = new Map();

  let routeDirs = Array.isArray(options.routeDir)
    ? options.routeDir
    : [options.routeDir ?? 'routes'];
  let defineRoutes = options.defineRoutes ?? defaultDefineRoutes;
  if (!defineRoutes) {
    throw new Error('You must provide a defineRoutes function');
  }
  let visitFiles = options.visitFiles ?? defaultVisitFiles;
  let routeRegex = options.routeRegex ?? defaultOptions.routeRegex;

  for (let routeDir of routeDirs) {
    visitFiles(path.join(appDir, routeDir), (file) => {
      if (
        ignoredFilePatterns &&
        ignoredFilePatterns.some((pattern) => minimatch(file, pattern, { dot: true }))
      ) {
        return;
      }

      if (isRouteModuleFile(file, routeRegex)) {
        let routeInfo = getRouteInfo(routeDir, file, options);
        routeMap.set(routeInfo.id, routeInfo);
        nameMap.set(routeInfo.name, routeInfo);
        return;
      }
    });
  }
  // update parentIds for all routes
  Array.from(routeMap.values()).forEach((routeInfo) => {
    let parentId = findParentRouteId(routeInfo, nameMap);
    routeInfo.parentId = parentId;
  });

  // Then, recurse through all routes using the public defineRoutes() API
  function defineNestedRoutes(defineRoute, parentId) {
    let childRoutes = Array.from(routeMap.values()).filter(
      (routeInfo) => routeInfo.parentId === parentId,
    );
    let parentRoute = parentId ? routeMap.get(parentId) : undefined;
    let parentRoutePath = parentRoute?.path ?? '/';
    for (let childRoute of childRoutes) {
      let routePath = childRoute?.path?.slice(parentRoutePath.length) ?? '';
      // remove leading slash
      if (routePath.startsWith('/')) {
        routePath = routePath.slice(1);
      }
      let index = childRoute.index;

      if (index) {
        let invalidChildRoutes = Object.values(routeMap).filter(
          (routeInfo) => routeInfo.parentId === childRoute.id,
        );

        if (invalidChildRoutes.length > 0) {
          throw new Error(
            `Child routes are not allowed in index routes. Please remove child routes of ${childRoute.id}`,
          );
        }

        defineRoute(routePath, routeMap.get(childRoute.id).file, {
          index: true,
        });
      } else {
        defineRoute(routePath, routeMap.get(childRoute.id).file, () => {
          defineNestedRoutes(defineRoute, childRoute.id);
        });
      }
    }
  }
  let routes = defineRoutes(defineNestedRoutes);
  return routes;
}

const routeModuleExts = ['.js', '.jsx', '.ts', '.tsx', '.md', '.mdx'];
const serverRegex = /\.server\.(ts|tsx|js|jsx|md|mdx)$/;
// const indexRouteRegex = /((^|[.]|[+]\/)(index|_index))(\/[^\/]+)?$|(\/_?index\/)/;
const indexRouteRegex = /((^|[.]|[+]\/)(index|_index))(\/[^\/]+)?$|(\/_?index\/)/;

function isRouteModuleFile(filename, routeRegex) {
  // flat files only need correct extension
  let isFlatFile = !filename.includes(path.sep);
  if (isFlatFile) {
    return routeModuleExts.includes(path.extname(filename));
  }
  let isRoute = routeRegex.test(filename);
  if (isRoute) {
    // check to see if it ends in .server.tsx because you may have
    // a _route.tsx and and _route.server.tsx and only the _route.tsx
    // file should be considered a route
    let isServer = serverRegex.test(filename);
    return !isServer;
  }
  return false;
}

function isIndexRoute(routeId) {
  //return indexRouteRegex.test(routeId);
  return routeId.includes('index');
}

function getRouteInfo(routeDir, file, options) {
  let filePath = normalizeSlashes(path.join(routeDir, file));
  let routeId = createRouteId(filePath);
  let routeIdWithoutRoutes = routeId.slice(routeDir.length + 1);
  let index = isIndexRoute(routeIdWithoutRoutes);
  let routeSegments = getRouteSegments(routeIdWithoutRoutes, index, options.paramPrefixChar);
  let routePath = createRoutePath(routeSegments, index, options);
  let routeInfo = {
    id: routeId,
    path: routePath,
    file: filePath,
    name: routeSegments.join('/'),
    segments: routeSegments,
    index,
  };

  return routeInfo;
}

// create full path starting with /
function createRoutePath(routeSegments, index, options) {
  let result = '';
  let basePath = options.basePath ?? '/';
  let paramPrefixChar = options.paramPrefixChar ?? '$';

  if (index) {
    // replace index with blank
    routeSegments[routeSegments.length - 1] = '';
  }
  for (let i = 0; i < routeSegments.length; i++) {
    let segment = routeSegments[i];
    // skip pathless layout segments
    if (segment.startsWith('_')) {
      continue;
    }
    // remove trailing slash
    if (segment.endsWith('_')) {
      segment = segment.slice(0, -1);
    }

    // handle param segments: $ => *, $id => :id
    if (segment.startsWith(paramPrefixChar)) {
      if (segment === paramPrefixChar) {
        result += `/*`;
      } else {
        result += `/:${segment.slice(1)}`;
      }
      // handle optional segments with param: ($segment) => :segment?
    } else if (segment.startsWith(`(${paramPrefixChar}`)) {
      result += `/:${segment.slice(2, segment.length - 1)}?`;
      // handle optional segments: (segment) => segment?
    } else if (segment.startsWith('(')) {
      result += `/${segment.slice(1, segment.length - 1)}?`;
    } else {
      result += `/${segment}`;
    }
  }
  if (basePath !== '/') {
    result = basePath + result;
  }
  return result || undefined;
}

function findParentRouteId(routeInfo, nameMap) {
  let parentName = routeInfo.segments.slice(0, -1).join('/');
  while (parentName) {
    if (nameMap.has(parentName)) {
      return nameMap.get(parentName).id;
    }
    parentName = parentName.substring(0, parentName.lastIndexOf('/'));
  }
  return undefined;
}

function getRouteSegments(name, index, paramPrefixChar = '$') {
  let routeSegments = [];
  let i = 0;
  let routeSegment = '';
  let state = 'START';
  let subState = 'NORMAL';
  let hasPlus = false;

  // name has already been normalized to use / as path separator

  // replace `+/_.` with `_+/`
  // this supports ability to to specify parent folder will not be a layout
  // _public+/_.about.tsx => _public_.about.tsx

  if (/\+\/_\./.test(name)) {
    name = name.replace(/\+\/_\./g, '_+/');
  }

  // replace `+/` with `.`
  // this supports folders for organizing flat-files convention
  // _public+/about.tsx => _public.about.tsx
  //
  if (/\+\//.test(name)) {
    name = name.replace(/\+\//g, '.');
    hasPlus = true;
  }
  let hasFolder = /\//.test(name);
  // if name has plus folder, but we still have regular folders
  // then treat ending route as flat-folders
  // if (((hasPlus && hasFolder) || !hasPlus) && !name.endsWith('.route')) {
  //   // do not remove segments ending in .route
  //   // since these would be part of the route directory name
  //   // docs/readme.route.tsx => docs/readme
  //   // remove last segment since this should just be the
  //   // route filename and we only want the directory name
  //   // docs/_layout.tsx => docs
  //   let last = name.lastIndexOf('/');
  //   if (last >= 0) {
  //     name = name.substring(0, last);
  //   }
  // }

  let pushRouteSegment = (routeSegment) => {
    if (routeSegment) {
      routeSegments.push(routeSegment);
    }
  };

  while (i < name.length) {
    let char = name[i];
    switch (state) {
      case 'START':
        // process existing segment
        if (
          routeSegment.includes(paramPrefixChar) &&
          !(
            routeSegment.startsWith(paramPrefixChar) ||
            routeSegment.startsWith(`(${paramPrefixChar}`)
          )
        ) {
          throw new Error(
            `Route params must start with prefix char ${paramPrefixChar}: ${routeSegment}`,
          );
        }
        if (
          routeSegment.includes('(') &&
          !routeSegment.startsWith('(') &&
          !routeSegment.endsWith(')')
        ) {
          throw new Error(`Optional routes must start and end with parentheses: ${routeSegment}`);
        }
        pushRouteSegment(routeSegment);
        routeSegment = '';
        state = 'PATH';
        continue; // restart without advancing index
      case 'PATH':
        if (isPathSeparator(char) && subState === 'NORMAL') {
          state = 'START';
          break;
        } else if (char === '[') {
          subState = 'ESCAPE';
          break;
        } else if (char === ']') {
          subState = 'NORMAL';
          break;
        }
        routeSegment += char;
        break;
    }
    i++; // advance to next character
  }
  // process remaining segment
  pushRouteSegment(routeSegment);
  // strip trailing .route segment
  if (routeSegments.at(-1) === 'route') {
    routeSegments = routeSegments.slice(0, -1);
  }
  // if hasPlus, we need to strip the trailing segment if it starts with _
  // and route is not an index route
  // this is to handle layouts in flat-files
  // _public+/_layout.tsx => _public.tsx
  // _public+/index.tsx => _public.index.tsx
  if (!index && hasPlus && routeSegments.at(-1)?.startsWith('_')) {
    routeSegments = routeSegments.slice(0, -1);
  }
  return routeSegments;
}

const pathSeparatorRegex = /[\/\\.]/;
function isPathSeparator(char) {
  return pathSeparatorRegex.test(char);
}

function defaultVisitFiles(dir, visitor, baseDir = dir) {
  for (let filename of fs.readdirSync(dir)) {
    let file = path.resolve(dir, filename);
    let stat = fs.lstatSync(file);

    if (stat.isDirectory()) {
      defaultVisitFiles(file, visitor, baseDir);
    } else if (stat.isFile()) {
      visitor(path.relative(baseDir, file));
    }
  }
}

function createRouteId(file) {
  return normalizeSlashes(stripFileExtension(file));
}

function normalizeSlashes(file) {
  return file.split(path.win32.sep).join('/');
}

function stripFileExtension(file) {
  return file.replace(/\.[a-z0-9]+$/i, '');
}
