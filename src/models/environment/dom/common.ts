
// TODO: May implement this in the future
export type URLSearchParams = string;
export type BufferSource = string;

export type BlobPart = ArrayBuffer | ArrayBufferView | Blob | string;

export type EventListenerOrEventListenerObject = EventListener | EventListenerObject;

export interface EventListenerOptions {
  capture?: boolean;
}

export interface EventInit {
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

export interface AbortSignal {
  aborted: boolean;

  addEventListener: (type: 'abort', listener: ((this: AbortSignal, event: any) => any), options?: boolean | {
    capture?: boolean | undefined;
    once?: boolean | undefined;
    passive?: boolean | undefined;
  }) => void;

  removeEventListener: (type: 'abort', listener: ((this: AbortSignal, event: any) => any), options?: boolean | {
    capture?: boolean | undefined;
  }) => void;

  dispatchEvent: (event: any) => boolean;

  onabort: null | ((this: AbortSignal, event: any) => any);
}


export interface AddEventListenerOptions extends EventListenerOptions {
  once?: boolean;
  passive?: boolean;
  signal?: AbortSignal;
}

export interface EventListener {
  (evt: Event): void;
}

export interface EventListenerObject {
  handleEvent(object: Event): void;
}

export interface BlobOptions {
  type?: string | undefined;
  endings?: 'transparent' | 'native' | undefined;
}

export declare class Blob {
  constructor(blobParts?: BlobPart[], options?: BlobOptions);
  readonly type: string;
  readonly size: number;
  slice(start?: number, end?: number): Blob;
  text(): Promise<string>;
}

type FormDataEntryValue = string;

/** Provides a way to easily construct a set of key/value pairs representing form fields and their values, which can then be easily sent using the XMLHttpRequest.send() method. It uses the same format a form would use if the encoding type were set to "multipart/form-data". */
export interface FormData {
  append(name: string, value: string | Blob, fileName?: string): void;
  delete(name: string): void;
  get(name: string): FormDataEntryValue | null;
  getAll(name: string): FormDataEntryValue[];
  has(name: string): boolean;
  set(name: string, value: string | Blob, fileName?: string): void;
}

export declare var FormData: {
  prototype: FormData;
  new(form?: HTMLFormElement): FormData;
};


/** The URL interface represents an object providing static methods used for creating object URLs. */
export interface URL {
  hash: string;
  host: string;
  hostname: string;
  href: string;
  toString(): string;
  readonly origin: string;
  password: string;
  pathname: string;
  port: string;
  protocol: string;
  search: string;
  readonly searchParams: URLSearchParams;
  username: string;
  toJSON(): string;
}

export declare var URL: {
  prototype: URL;
  new(url: string | URL, base?: string | URL): URL;
  createObjectURL(obj: Blob): string;
  revokeObjectURL(url: string): void;
};
