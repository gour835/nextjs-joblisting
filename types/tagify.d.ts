declare module "@yaireo/tagify" {
  export interface TagData {
    value: string;
    [key: string]: unknown;
  }

  export interface BaseEvent<T = unknown> {
    detail: T;
  }

  export interface InvalidTagData {
    data?: TagData;
    tag?: HTMLElement;
    message?: string;
    index?: number;
  }

  export interface ChangeEventData {
    value: string;
    tags?: TagData[];
  }

  export interface DropdownSettings {
    position?: "all" | "input" | "text" | "manual";
    enabled?: number;
    maxItems?: number;
    classname?: string;
    closeOnSelect?: boolean;
    [key: string]: unknown;
  }

  export interface TagifyCallbacks {
    invalid?: (e: BaseEvent<InvalidTagData>) => void;
    change?: (e: BaseEvent<ChangeEventData>) => void;
    add?: (e: BaseEvent<unknown>) => void;
    remove?: (e: BaseEvent<unknown>) => void;
    [key: string]: ((e: BaseEvent<any>) => void) | undefined;
  }

  export interface TagifySettings<T extends TagData = TagData> {
    editTags?: boolean | number | { keepInvalid?: boolean; [key: string]: unknown };
    pattern?: RegExp | string;
    whitelist?: Array<string | T>;
    enforceWhitelist?: boolean;
    delimiters?: string | RegExp | null;
    maxTags?: number;
    callbacks?: TagifyCallbacks;
    dropdown?: DropdownSettings;
    [key: string]: unknown;
  }

  export default class Tagify<T extends TagData = TagData> {
    settings: TagifySettings<T>;
    value: T[] | string;
    whitelist: Array<string | T> | null;

    constructor(input: HTMLInputElement | HTMLTextAreaElement, settings?: TagifySettings<T>);

    addEmptyTag(value?: string | T): void;
    removeAllTags(): void;
    destroy(): void;
    loading(isLoading: boolean): this;
    on(eventName: string, callback: (e: BaseEvent<any>) => void): this;
    off(eventName: string, callback?: (e: BaseEvent<any>) => void): this;
    dropdown: {
      show(value?: string): void;
      hide(): void;
    };
  }
}