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
  NumberInput,
} from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useForm, zodResolver } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { FormEvent } from "react";
import { trpc } from "../src/utils/trpc";
import { z } from "zod";
import { showNotification } from "@mantine/notifications";

const schema = z.object({
  site_id: z.string(),
  client_id: z.number(),
  project_name_id: z.number(),
});

export function AddFormModal() {
  const [opened, { close, open }] = useDisclosure(false);
  const form = useForm({
    validate: zodResolver(schema),
    initialValues: {
      site_id: null,
      client_id: null,
      project_name_id: null,
    },
  });
  const { mutate, mutateAsync, isLoading, data, isSuccess, isError } =
    trpc.siteinfo.add.useMutation();
  const handleSubmit = async () => {
    // e.preventDefault();
    await mutateAsync({
      site_id: form.values.site_id,
      client_id: form.values.client_id,
      project_name_id: form.values.project_name_id,
    });
    if (isSuccess) {
      showNotification({
        message: data?.message,
      });
      return;
    }
    isError &&
      showNotification({
        message: "Site Error",
        color: "red",
      });
  };
  return (
    <>
      <Modal
        title="Add Site info"
        centered
        opened={opened}
        onClose={close}
        size="lg"
      >
        <form
          onSubmit={form.onSubmit((values: typeof schema) => handleSubmit())}
        >
          <Grid grow>
            <Grid.Col span={4}>
              <TextInput
                placeholder="Enter Site Id"
                withAsterisk
                {...form.getInputProps("site_id")}
              />
              <Select
                id="addClient"
                name="clients"
                placeholder="Pick one"
                data={[
                  { value: 13, label: "React" },
                  { value: 2, label: "Angular" },
                  { value: 3, label: "Svelte" },
                  { value: 4, label: "Vue" },
                ]}
                {...form.getInputProps("client_id")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                id="addProject"
                name="projectName"
                placeholder="Pick one"
                data={[
                  { value: 29, label: "React" },
                  { value: 2, label: "Angular" },
                  { value: 3, label: "Svelte" },
                  { value: 4, label: "Vue" },
                ]}
                {...form.getInputProps("project_name_id")}
              />
            </Grid.Col>
          </Grid>

          <Grid grow>
            <Grid.Col span={4}>
              <Input
                id="addSurveyourName"
                name="surveyourName"
                placeholder="Surveyour Name"
                radius="xs"
                {...form.getInputProps("addSurveyourName")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <DatePicker
                id="addDate"
                name="date"
                placeholder="Pick date"
                firstDayOfWeek="sunday"
                {...form.getInputProps("addDate")}
              />
            </Grid.Col>
          </Grid>

          <Textarea
            name="description"
            placeholder="Your description"
            withAsterisk
            mt="8px"
            {...form.getInputProps("addDescription")}
          />

          <Button loading={isLoading} fullWidth mt="8px" type="submit">
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
function addLoader(submit_btn: any) {
  throw new Error("Function not implemented.");
}

function removeLoader(submit_btn: any) {
  throw new Error("Function not implemented.");
}
