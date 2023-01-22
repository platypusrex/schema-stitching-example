import { GraphQLScalarType, Kind, StringValueNode, ValueNode } from "graphql";

const isStringValueNode = (ast: ValueNode): ast is StringValueNode => {
  return ast.kind === Kind.STRING;
};

const leapYear = (year: number): boolean => {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
};

export const validateJSDate = (date: Date): boolean => {
  const time = date.getTime();
  return time === time;
};

export const serializeDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const parseDate = (date: string): Date => {
  return new Date(date);
};

export const validateDate = (dateString: string): boolean => {
  const RFC_3339_REGEX = /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01]))$/;

  if (!RFC_3339_REGEX.test(dateString)) {
    return false;
  }

  // Verify the correct number of days for
  // the month contained in the date-string.
  const year = Number(dateString.substr(0, 4));
  const month = Number(dateString.substr(5, 2));
  const day = Number(dateString.substr(8, 2));

  switch (month) {
    case 2: // February
      if (leapYear(year) && day > 29) {
        return false;
      } else if (!leapYear(year) && day > 28) {
        return false;
      }

      return true;
    case 4: // April
    case 6: // June
    case 9: // September
    case 11: // November
      if (day > 30) {
        return false;
      }

      break;
  }

  return true;
};

export const dateScalar = new GraphQLScalarType({
  name: "Date",
  description:
    "A date string, such as 2007-12-03, compliant with the `full-date` " +
    "format outlined in section 5.6 of the RFC 3339 profile of the " +
    "ISO 8601 standard for representation of dates and times using " +
    "the Gregorian calendar.",
  serialize(value): string {
    if (!(value instanceof Date)) {
      throw new TypeError("Date cannot represent non-date type");
    }

    if (validateJSDate(value)) {
      return serializeDate(value);
    }

    throw new TypeError("Date cannot represent an invalid Date instance");
  },
  parseValue(value): Date {
    console.log({ value });
    if (typeof value !== "string") {
      throw new TypeError(
        `Date cannot represent non string type ${JSON.stringify(value)}`
      );
    }

    const trimmedValue = value.split("T")[0];

    if (validateDate(trimmedValue)) {
      return parseDate(trimmedValue);
    }

    throw new TypeError(
      `Date cannot represent an invalid date-string ${value}.`
    );
  },
  parseLiteral(ast: ValueNode): Date {
    if (!isStringValueNode(ast)) {
      throw new TypeError(`Date cannot represent non string type ${ast.kind}`);
    }

    const { value } = ast;
    const trimmedValue = value.split("T")[0];

    if (validateDate(trimmedValue)) {
      return parseDate(trimmedValue);
    }

    throw new TypeError(
      `Date cannot represent an invalid date-string ${String(value)}.`
    );
  },
});
