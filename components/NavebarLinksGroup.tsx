import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import {
  TablerIcon,
  IconCalendarStats,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons";
import Link from "next/link";
import { Url } from "url";
const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },
  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
  chevron: {
    transition: "transform 200ms ease",
  },
}));

interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  link?: string;
  links?: { label: string; link: string }[];
}

export function NavebarLinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  links,
  link,
}: LinksGroupProps) {
  const { classes, cx, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const [active, setActive] = useState("");
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    <Link
      className={cx(classes.link, {
        [classes.linkActive]: link.label  === active,
      })}
      href={link.link}
      key={link.label}
      onClick={(event) => setActive(link.label)}
    >
      {link.label}
    </Link>
  ));

  return (
    <>
      {hasLinks ? (
        <>
          <UnstyledButton
            onClick={() => setOpened((o) => !o)}
            className={classes.control}
          >
            <Group position="apart" spacing={0}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThemeIcon variant="light" size={30}>
                  <Icon size={18} />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
              {hasLinks && (
                <ChevronIcon
                  className={classes.chevron}
                  size={14}
                  stroke={1.5}
                  style={{
                    transform: opened
                      ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                      : "none",
                  }}
                />
              )}
            </Group>
          </UnstyledButton>
          <Collapse in={opened}>{items}</Collapse>
        </>
      ) : (
        <Link href={link!} >
          <UnstyledButton
            onClick={() => {setOpened((o) => !o); setActive(label!)}}
            className={cx(classes.control, {
              [classes.linkActive]: link === active,
            })}
          >
            <Group position="apart" spacing={0}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <ThemeIcon variant="light" size={30}>
                  <Icon size={18} />
                </ThemeIcon>
                <Box ml="md">{label}</Box>
              </Box>
              {hasLinks && (
                <ChevronIcon
                  className={classes.chevron}
                  size={14}
                  stroke={1.5}
                  style={{
                    transform: opened
                      ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                      : "none",
                  }}
                />
              )}
            </Group>
          </UnstyledButton>
        </Link>
      )}
    </>
  );
}

const mockdata = {
  label: "Releases",
  icon: IconCalendarStats,
  links: [
    { label: "Upcoming releases", link: "/" },
    { label: "Previous releases", link: "/" },
    { label: "Releases schedule", link: "/" },
  ],
};

export function NavbarLinksGroup() {
  return (
    <Box
      sx={(theme) => ({
        minHeight: 220,
        padding: theme.spacing.md,
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
      })}
    >
      <NavebarLinksGroup {...mockdata} />
    </Box>
  );
}
