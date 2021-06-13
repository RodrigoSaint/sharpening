import React from "react";
import { Meta } from "@storybook/react";

import Modal from "../packages/modal/source";

export default {
  title: "Modal",
  component: Modal,
} as Meta;

export const DefaultModal = () => (
  <Modal
    header="A nice modal"
    renderTrigger={() => <button>Click to Open</button>}
    renderContent={(close) => <div onClick={close}>It is open</div>}
  />
);
