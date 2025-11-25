/**
 * Core type definitions for Dependency Injection Container
 */

/**
 * Service token identifier
 */
export type ServiceToken<T = any> = (symbol | string) & {
  readonly __brand?: T;
};

/**
 * Service lifecycle types
 */
export enum ServiceLifecycle {
  SINGLETON = 'singleton',
  TRANSIENT = 'transient',
}

/**
 * Service factory function
 */
export type ServiceFactory<T> = (container: IContainer) => T;

/**
 * Service registration configuration
 */
export interface ServiceRegistration<T = any> {
  token: ServiceToken<T>;
  factory: ServiceFactory<T>;
  lifecycle: ServiceLifecycle;
}

/**
 * Container interface
 */
export interface IContainer {
  /**
   * Register a service in the container
   */
  register<T>(registration: ServiceRegistration<T>): void;

  /**
   * Resolve a service from the container
   */
  resolve<T>(token: ServiceToken<T>): T;

  /**
   * Check if a service is registered
   */
  has(token: ServiceToken): boolean;

  /**
   * Clear all services (useful for testing)
   */
  clear(): void;
}
