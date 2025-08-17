export interface Repository<T> {
  create(data: Omit<T, "id" | "createdAt" | "updatedAt">): Promise<T>;
  findById(id: string): Promise<T | null>;
  findAll(): Promise<T[]>;
  update(
    id: string,
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ): Promise<T>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}

export interface UserRepository<T> {
  create(
    data: Omit<T, "id" | "createdAt" | "updatedAt"> & { userId: string }
  ): Promise<T>;
  findById(id: string, userId: string): Promise<T | null>;
  findAll(userId: string): Promise<T[]>;
  update(
    id: string,
    userId: string,
    data: Partial<Omit<T, "id" | "createdAt" | "updatedAt">>
  ): Promise<T>;
  delete(id: string, userId: string): Promise<void>;
  exists(id: string, userId: string): Promise<boolean>;
}
