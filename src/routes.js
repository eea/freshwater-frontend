/**
 * Routes.
 * @module routes
 */

import { App, NotFound } from '@plone/volto/components';
import { defaultRoutes, multilingualRoutes } from '@plone/volto/routes';
import config from '@plone/volto/registry';

/**
 * Routes array.
 * @array
 * @returns {array} Routes.
 */
// const routes = [
//   {
//     path: '/',
//     component: App, // Change this if you want a different component
//     routes: [
//       // Add your routes here
//       // addon routes have a higher priority then default routes
//       ...(config.addonRoutes || []),
//       ...defaultRoutes,
//     ],
//   },
// ];
const routes = [
  {
    path: config.settings.prefixPath || '/',
    component: config.getComponent('App').component,
    routes: [
      // redirect to external links if path is in blacklist
      ...(config.settings?.externalRoutes || []).map((route) => ({
        ...route.match,
        component: NotFound,
      })),
      ...[
        // addon routes have a higher priority then default routes
        ...(config.addonRoutes || []),
        ...((config.settings?.isMultilingual && multilingualRoutes) || []),
        ...defaultRoutes,
      ].map((route) =>
        config.settings.prefixPath
          ? {
              ...route,
              path: Array.isArray(route.path)
                ? route.path.map(
                    (path) => `${config.settings.prefixPath}${path}`,
                  )
                : `${config.settings.prefixPath}${route.path}`,
            }
          : route,
      ),
    ],
  },
];

export default routes;
