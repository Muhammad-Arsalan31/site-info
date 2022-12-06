import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
  Modal,
  Input,
  Textarea,
  Select,
  Grid,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm } from '@mantine/form';
import { useDisclosure } from "@mantine/hooks";

export function AddFormModal() {
  const [opened, { close, open }] = useDisclosure(false);
  const form = useForm({
    initialValues: {
      email: '',
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <>
      <Modal centered opened={opened} onClose={close} size="lg">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Grid grow>
            <Grid.Col span={4}>
              <Input id="addSiteId" placeholder="Site Id" radius="xs" />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                id="addClient"
                placeholder="Pick one"
                data={[
                  { value: "react", label: "React" },
                  { value: "ng", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "vue", label: "Vue" },
                ]}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                id="addProject"
                placeholder="Pick one"
                data={[
                  { value: "react", label: "React" },
                  { value: "ng", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "vue", label: "Vue" },
                ]}
              />
            </Grid.Col>
          </Grid>

          <Grid grow>
            <Grid.Col span={4}>
              <Input id="addSurveyourName" placeholder="Site Id" radius="xs" />
            </Grid.Col>
            <Grid.Col span={4}>
              <DatePicker
                id="addDate"
                placeholder="Pick date"
                firstDayOfWeek="sunday"
              />
            </Grid.Col>
          </Grid>

          <Textarea
            id="addDescription"
            placeholder="Your description"
            withAsterisk
          />
          <Button fullWidth mt="xl">
            Add Site Info
          </Button>
        </form>
      </Modal>
      <Group position="center">
        <Button onClick={open}>Open modal</Button>
      </Group>
    </>
  );
}
