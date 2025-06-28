/**
 * Shared types for the application's routing system
 *
 * This file contains definitions of types that are used
 * by all features to implement the centralized routing system.
 */

/**
 * Basic route type
 */
export interface BaseRoute {
  /** Route pattern (can include parameters like :id) */
  path: string;
  /** Title for the page (used in metadata) */
  title: string;
  /** Description for the page (used in metadata) */
  description: string;
}

/**
 * Dynamic route type
 */
export interface DynamicRoute<T extends Record<string, string | number>>
  extends BaseRoute {
  /** Function to generate the URL with parameters */
  generatePath: (params: T) => string;
}
