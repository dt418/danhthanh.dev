/**
 * Simple Dependency Injection Container
 * Manages service registration and resolution with lifecycle management
 */

import type {
  IContainer,
  ServiceFactory,
  ServiceLifecycle,
  ServiceRegistration,
  ServiceToken,
} from './types';

export class Container implements IContainer {
  private services = new Map<ServiceToken, ServiceRegistration>();

  private singletons = new Map<ServiceToken, any>();

  /**
   * Register a service in the container
   */
  register<T>(registration: ServiceRegistration<T>): void {
    this.services.set(registration.token, registration);
  }

  /**
   * Resolve a service from the container
   */
  resolve<T>(token: ServiceToken<T>): T {
    const registration = this.services.get(token);

    if (!registration) {
      throw new Error(`Service not registered: ${String(token)}`);
    }

    // Return singleton instance if already created
    if (registration.lifecycle === 'singleton' && this.singletons.has(token)) {
      return this.singletons.get(token) as T;
    }

    // Create new instance
    const instance = registration.factory(this);

    // Store singleton instance
    if (registration.lifecycle === 'singleton') {
      this.singletons.set(token, instance);
    }

    return instance as T;
  }

  /**
   * Check if a service is registered
   */
  has(token: ServiceToken): boolean {
    return this.services.has(token);
  }

  /**
   * Clear all services (useful for testing)
   */
  clear(): void {
    this.services.clear();
    this.singletons.clear();
  }
}

/**
 * Global container instance
 */
export const container = new Container();

/**
 * Helper function to register a singleton service
 */
export function registerSingleton<T>(
  token: ServiceToken<T>,
  factory: ServiceFactory<T>
): void {
  container.register({
    token,
    factory,
    lifecycle: 'singleton' as ServiceLifecycle,
  });
}

/**
 * Helper function to register a transient service
 */
export function registerTransient<T>(
  token: ServiceToken<T>,
  factory: ServiceFactory<T>
): void {
  container.register({
    token,
    factory,
    lifecycle: 'transient' as ServiceLifecycle,
  });
}
