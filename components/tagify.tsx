/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Tagify, {
  type BaseEvent,
  type ChangeEventData,
  type InvalidTagData,
  type TagData,
  type TagifySettings,
} from "@yaireo/tagify";
import "@yaireo/tagify/dist/tagify.css";
import "../app/tagify-custom.css";

function createRandomEmails(count = 100): string[] {
  return Array.from({ length: count }, () => {
    const length = Math.floor(Math.random() * 10 + 3);
    const localPart = Array.from({ length }, () =>
      String.fromCharCode(Math.floor(Math.random() * (123 - 97) + 97))
    ).join("");
    return `${localPart}@gmail.com`;
  });
}

export default function CustomLookEmailInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tagifyRef = useRef<Tagify | null>(null);
  const [emails, setEmails] = useState<string[]>([]);
  const [whitelist, setWhitelist] = useState<string[]>([]);

  const settings = useMemo<TagifySettings<TagData>>(
    () => ({
      editTags: {
        keepInvalid: false,
      },
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      whitelist: [],
      callbacks: {
        invalid: (e: BaseEvent<InvalidTagData>) => {
          console.log("invalid", e.detail);
        },
        change: (e: BaseEvent<ChangeEventData>) => {
          const rawValue = e.detail.value;
          try {
            const parsed: Array<{ value: string }> = rawValue
              ? JSON.parse(rawValue)
              : [];
            setEmails(parsed.map((item) => item.value));
          } catch {
            setEmails([]);
          }
        },
      },
      dropdown: {
        position: "text",
        enabled: 1,
      },
    }),
    []
  );

  useEffect(() => {
    setWhitelist(createRandomEmails(100));
  }, []);

  useEffect(() => {
    const inputEl = inputRef.current;
    if (!inputEl) return;

    const instance = new Tagify(inputEl, settings);
    tagifyRef.current = instance;

    return () => {
      instance.destroy();
      tagifyRef.current = null;
    };
  }, [settings]);

  useEffect(() => {
    if (!tagifyRef.current) return;
    tagifyRef.current.settings.whitelist = whitelist;
  }, [whitelist]);

  const handleAddButtonClick = () => {
    tagifyRef.current?.addEmptyTag();
  };

  return (
    <div>
      <div>
        <input ref={inputRef} className="customLook" />
        <button type="button" onClick={handleAddButtonClick} aria-label="Add new tag">
          +
        </button>
      </div>
      <p>Selected emails: {emails.join(", ") || "None"}</p>
    </div>
  );
}