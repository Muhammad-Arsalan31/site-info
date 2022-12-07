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
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";

export function AddFormModal() {
  const [opened, { close, open }] = useDisclosure(false);
  const form = useForm({
    // initialValues: {
    // addSiteId: 0,
    // termsOfService: false,
    // },
    // validate: {
    //   addSiteId: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  return (
    <>
      <Modal centered opened={opened} onClose={close} size="lg">
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
          <Grid grow>
            <Grid.Col span={4}>
              <NumberInput
                id="addSiteId"
                name="siteId"
                placeholder="Site id"
                {...form.getInputProps("addSiteId")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                id="addClient"
                name="clients"
                placeholder="Pick one"
                data={[
                  { value: "react", label: "React" },
                  { value: "ng", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "vue", label: "Vue" },
                ]}
                {...form.getInputProps("addClient")}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <Select
                id="addProject"
                name="projectName"
                placeholder="Pick one"
                data={[
                  { value: "react", label: "React" },
                  { value: "ng", label: "Angular" },
                  { value: "svelte", label: "Svelte" },
                  { value: "vue", label: "Vue" },
                ]}
                {...form.getInputProps("addProject")}
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
            id="addDescription"
            name="description"
            placeholder="Your description"
            withAsterisk
            mt="8px"
            {...form.getInputProps("addDescription")}
          />

          <Button fullWidth mt="8px" type="submit">
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
