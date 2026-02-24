async function createEmojiParser() {
  const emojiRegexPart = Object.values(config.prompt.questions.type.enum)
    .map((value) => value.emoji.trim())
    .join("|");

  const parserOpts = {
    breakingHeaderPattern: new RegExp(
      `^(?:${emojiRegexPart})\\s+(\\w*)(?:\\((.*)\\))?!:\\s+(.*)$`,
    ),
    headerPattern: new RegExp(
      `^(?:${emojiRegexPart})\\s+(\\w*)(?:\\((.*)\\))?!?:\\s+(.*)$`,
    ),
  };

  const emojiParser = merge({}, await createPreset(), {
    conventionalChangelog: { parserOpts },
    parserOpts,
    recommendedBumpOpts: { parserOpts },
  });

  return emojiParser;
}

const emojiParser = await createEmojiParser();

/** @type {import('@commitlint/types').UserConfig} */

export default {
	parserPreset: emojiParser,
  rules: {
    "body-leading-blank": [1, "always"], // body начинается с пустой строки
    "body-max-line-length": [2, "always", 100], // body макс символы

    "footer-leading-blank": [1, "always"], // footer начинается с пустой строки
    "footer-max-line-length": [2, "always", 100], // footer макс символы

    "header-max-length": [2, "always", 100], // header макс символы
    "header-full-stop": [2, "never", "."], // нельзя в заголовке писать точку в конце
		"header-case": [2, "always", "lower-case"], // header должен быть в формате lower-case
    "header-trim": [2, "always"], // нельзя в начале и в конце ставить пробел

    "subject-empty": [2, "never"], // описание проделанного в заголовке не должно быть пустым

    "type-case": [2, "always", "lower-case"], // тип должен быть в формате lower-case
    "type-empty": [2, "never"], // тип никогда не должен быть пустым
    "type-enum": [
      2,
      "always",
      [
        "feat", // Добавление нового
        "fix", // Исправление бага
        "docs", // Исправление документации
        "style", // Изменения, не влияющие на смысл кода
        "refactor", // Рефакторинг кода
        "test", // Добавление недостающих тестов или исправление существующих
        "build", //Изменения, влияющие на систему сборки или внешние зависимости
        "chore", // Изменение файлов, которые не являются частью проекта (конфиги, библиотеки)
        "revert", // Отменяет предыдущую фиксацию
        "init", // Инициализирую проект
      ],
    ],
  },
  prompt: {
    settings: {},
    messages: {
      skip: "Можно пропустить",
      max: "Не больше %d символов",
      min: "%d символов не меньше",
      emptyWarning: "Не может быть пустым",
      upperLimitWarning: "Превысили лимит",
      lowerLimitWarning: "Минимальный лимит не пройден",
    },
    questions: {
      type: {
        description: "Выберите тип изменений, которые вы собираетесь внести",
        enum: {
          feat: {
            description: "Добавление нового",
            title: "Features",
            emoji: "✨ ",
          },
          fix: {
            description: "Исправление бага",
            title: "Bug Fixes",
            emoji: "🐛  ",
          },
          docs: {
            description: "Исправление документации",
            title: "Documentation",
            emoji: "📚 ",
          },
          style: {
            description: "Изменения, не влияющие на смысл кода",
            title: "Styles",
            emoji: "💎 ",
          },
          refactor: {
            description: "Рефакторинг кода",
            title: "Code Refactoring",
            emoji: "🚀 ",
          },
          test: {
            description:
              "Добавление недостающих тестов или исправление существующих",
            title: "Tests",
            emoji: "🚨 ",
          },
          build: {
            description:
              "Изменения, влияющие на систему сборки или внешние зависимости",
            title: "Builds",
            emoji: "🛠 ",
          },
          chore: {
            description:
              "Изменение файлов, которые не являются частью проекта (конфиги, библиотеки)",
            title: "Chores",
            emoji: "♻️ ",
          },
          revert: {
            description: "Отменяет предыдущую фиксацию",
            title: "Reverts",
            emoji: "🗑 ",
          },
          init: {
            description: "Инициализирует проект",
            title: "Init",
            emoji: "🔥 ",
          },
        },
				emojiInHeader: true,
      },
      scope: {
        description:
          "Какова область применения этого изменения (например, имя компонента или файла)",
      },
      subject: {
        description:
          "Напишите краткое описание изменений в повелительном наклонении",
      },
      body: {
        description: "Дайте более подробное описание изменения",
      },
      isBreaking: {
        description: "Это какие-то серьезные изменения?",
      },
      breakingBody: {
        description:
          "Для фиксации серьезных изменений требуется описание. Пожалуйста, введите более подробное описание самого коммита, после опишите сами серьезные изменения",
      },
      breaking: {
        description: "Опишите серьезные изменения",
      },
      isIssueAffected: {
        description: "Затрагивает ли это изменение какие-либо issue?",
      },
      issuesBody: {
        description:
          "Если проблемы закрыты, фиксация требует описания. Пожалуйста, введите более подробное описание самого коммита, после введите ссылки на решенные проблемы",
      },
      issues: {
        description: 'Добавьте ссылки на проблемы (например, "fix #123").',
      },
    },
  },
};
