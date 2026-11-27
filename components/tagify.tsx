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



const SOFTWARE_DEV_SKILLS = [
  // Languages
  'JavaScript',
  'TypeScript',
  'Python',
  'Java',
  'C',
  'C++',
  'C#',
  'Go',
  'Rust',
  'PHP',
  'Ruby',
  'Kotlin',
  'Swift',
  'Dart',
  'Scala',
  'SQL',
  'Bash',
  'PowerShell',

  // Frontend & UI
  'HTML5',
  'CSS3',
  'React',
  'Next.js',
  'Vue.js',
  'Nuxt',
  'Angular',
  'Svelte',
  'Tailwind CSS',
  'Shadcn UI',
  'Bootstrap',
  'Redux Toolkit',
  'Zustand',
  'TanStack Query',
  'jQuery',
  'Vite',
  'Webpack',

  // Backend & APIs
  'Node.js',
  'Express.js',
  'NestJS',
  'Fastify',
  'Laravel',
  'Symfony',
  'Django',
  'FastAPI',
  'Flask',
  'Spring Boot',
  'ASP.NET Core',
  'REST APIs',
  'GraphQL',
  'tRPC',
  'WebSockets',
  'Socket.IO',
  'Server-Sent Events',

  // Databases, Caching & Queues
  'PostgreSQL',
  'MySQL',
  'SQLite',
  'MongoDB',
  'ClickHouse',
  'Redis',
  'BullMQ',
  'Prisma',
  'Mongoose',
  'Sequelize',
  'TypeORM',
  'Drizzle ORM',
  'Elasticsearch',

  // DevOps, Cloud & Servers
  'Git',
  'GitHub',
  'GitLab CI/CD',
  'Docker',
  'Kubernetes',
  'Linux',
  'Ubuntu',
  'Nginx',
  'Apache2',
  'PHP-FPM',
  'AWS',
  'Google Cloud',
  'Microsoft Azure',
  'Vercel',
  'Cloudflare',
  'Terraform',

  // Testing, Architecture & Practices
  'Jest',
  'Vitest',
  'Playwright',
  'Cypress',
  'System Design',
  'Data Structures and Algorithms',
  'Microservices',
  'CI/CD',
  'OAuth / JWT',
  'Webhooks',
];
export default function CustomLookEmailInput() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const tagifyRef = useRef<Tagify | null>(null);
  const [skills, setSkills] = useState<string[]>([]);

  const settings = useMemo<TagifySettings<TagData>>(
    () => ({
      editTags: {
        keepInvalid: false,
      },
      pattern:
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      whitelist: SOFTWARE_DEV_SKILLS,
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
            setSkills(parsed.map((item) => item.value));
          } catch {
            setSkills([]);
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
    const inputEl = inputRef.current;
    if (!inputEl) return;

    const instance = new Tagify(inputEl, settings);
    tagifyRef.current = instance;

    return () => {
      instance.destroy();
      tagifyRef.current = null;
    };
  }, [settings]);


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
      <p>Selected skills: {skills.join(", ") || "None"}</p>
    </div>
  );
}