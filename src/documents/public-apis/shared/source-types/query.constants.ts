export const COMMON_QUERY_KEYS = {
  PAGE: 'page',
  LIMIT: 'limit',
  KEYWORD: 'keyword',
} as const;

export const USER_QUERY_KEYS = {
  IS_ACTIVE: 'isActive',
  ROLE_ID: 'roleId',
  INCLUDE_DELETED: 'includeDeleted',
} as const;

export const ROLE_QUERY_KEYS = {
  IS_SYSTEM: 'isSystem',
  STATUS: 'status',
} as const;

export const PAGINATION_DEFAULTS = {
  PAGE: 1,
  LIMIT: 10,
} as const;
