/**
 * Database adapter interface
 * Defines the contract for database connection management
 */

export interface IDatabaseAdapter {
  /**
   * Connect to the database
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  disconnect(): Promise<void>;

  /**
   * Check if connected
   */
  isConnected(): boolean;

  /**
   * Get the underlying client instance
   */
  getClient<T>(): T;
}
