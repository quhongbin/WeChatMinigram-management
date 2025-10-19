import type { number } from "echarts/core"

interface FilteredUser {
      id: number,
      username: string,
      email: string,
      status: string,
      role: string,
      lastLogin: string
}

export type { FilteredUser };
