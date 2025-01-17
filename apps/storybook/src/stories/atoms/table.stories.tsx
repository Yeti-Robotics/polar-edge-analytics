import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/table";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Table> = {
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;


const generateRows = (rowCount: number, cellCount: number) => {
  return Array.from({ length: rowCount }, (_, rowIndex) => (
    <TableRow key={rowIndex}>
      {Array.from({ length: cellCount }, (_, cellIndex) => (
        <TableCell key={cellIndex}>{`test${cellIndex + 1}`}</TableCell>
      ))}
    </TableRow>
  ));
};

export const FirstStory: Story = {
  args: {},
  render() {
    return (
      <Table>
        <TableCaption>A List of Recent Robot Performances</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead colSpan={4} className="border-r font-bold">Auto</TableHead>
            <TableHead colSpan={4} className="border-r font-bold">Teleop</TableHead>
            <TableHead colSpan={5} className="border-r font-bold">Endgame</TableHead>
          </TableRow>
          <TableRow>
            {[
              "Team Name & #",
              "Left Black Line",
              "Coral Scored Per Level",
              "Algae Processed",
              "Algae Netted",
              "Coral Scored Per Level",
              "Algae Processed",
              "Algae in Net",
              "# of Algae Thrown and by Who",
              "Cage Climb",
              "(Shallow Cage Hung?)",
              "(Deep Cage Hung?)",
              "(Parked?)",
            ].map((header, index) => (
              <TableHead key={index} className="border-r">{header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>{generateRows(9, 13)}</TableBody>
      </Table>
    );
  },
};
