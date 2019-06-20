// Test away!
import React from 'react';
import * as rtl from '@testing-library/react';
import 'jest-dom/extend-expect';
import Controls from "./Controls";
import { SSL_OP_EPHEMERAL_RSA } from 'constants';

afterEach(rtl.cleanup);

it("provide buttons to toggle the closed and locked states", async () => {
    const wrapper = rtl.render(<Controls locked={false} closed={false}/>);
    let closebtn = wrapper.getByTestId('toggle-closed');
    let lockbtn = wrapper.getByTestId('toggle-locked');
    expect(closebtn).toBeDefined();
    expect(lockbtn).toBeDefined();
})

it("buttons' text changes to reflect the state the door will be in if clicked", async () => {
    let wrapper;  let closebtn; let lockbtn;
    wrapper = rtl.render(<Controls locked={false} closed={false}/>);
    closebtn = wrapper.getByTestId('toggle-closed');
    lockbtn = wrapper.getByTestId('toggle-locked');
    expect(closebtn.firstChild.textContent).toBe("Close Gate");
    expect(lockbtn.firstChild.textContent).toBe("Lock Gate");
    await rtl.fireEvent.click(closebtn);
    await rtl.fireEvent.click(lockbtn);
    rtl.cleanup();
    wrapper = rtl.render(<Controls locked={true} closed={true}/>);
    closebtn = wrapper.getByTestId('toggle-closed');
    lockbtn = wrapper.getByTestId('toggle-locked');
    expect(closebtn.firstChild.textContent).toBe("Open Gate");
    expect(lockbtn.firstChild.textContent).toBe("Unlock Gate");
    await rtl.fireEvent.click(closebtn);
    await rtl.fireEvent.click(lockbtn);
})


it("cannot be closed or opened if it is locked and cannot be locked if opened",async () =>
{
    let wrapper = rtl.render(<Controls locked={true} closed={true}/>);
    let button = wrapper.getByTestId('toggle-closed');
    await rtl.fireEvent.click(button);
    expect(button.disabled).toBe(true);
    rtl.cleanup();
    wrapper = rtl.render(<Controls locked={false} closed={false}/>);
    button = wrapper.getByTestId('toggle-locked');
    await rtl.fireEvent.click(button);
    expect(button.disabled).toBe(true);
})


function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}