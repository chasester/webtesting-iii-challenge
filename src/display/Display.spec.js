import React from 'react';
import Display from "./Display";
import * as rtl from '@testing-library/react';
import 'jest-dom/extend-expect';

afterEach(rtl.cleanup);

it('shows the display', () => {
    // ready to test!
    const wrapper = rtl.render(<Display />);
  });

it("displays 'Locked' if the locked prop is true and 'Unlocked' if otherwise", () => {
    let wrapper = rtl.render(<Display closed={true} locked={true} />);
    expect(wrapper.container.firstChild.firstChild.textContent).toBe("Locked");
    rtl.cleanup();
    wrapper = rtl.render(<Display closed={true} locked={false} />);
    expect(wrapper.container.firstChild.firstChild.textContent).toBe("Unlocked");
})

it("when locked or closed use the red-led class", () => {
    const wrapper = rtl.render(<Display closed={true} locked={true} />);
    expect(wrapper.container.firstChild.firstChild.classList[1]).toBe("red-led")
    expect(wrapper.container.firstChild.lastChild.classList[1]).toBe("red-led")
})

it("displays 'Closed' if the closed prop is true and 'Open' if otherwise", () => {
    let wrapper = rtl.render(<Display closed={true} locked={true} />);
    expect(wrapper.container.firstChild.lastChild.textContent).toBe("Closed");
    rtl.cleanup();
    wrapper = rtl.render(<Display closed={false} locked={false} />);
    expect(wrapper.container.firstChild.lastChild.textContent).toBe("Open");
})

it("displays 'Locked' if the locked prop is true and 'Unlocked' if otherwise", () => {
    const wrapper = rtl.render(<Display closed={false} locked={false} />);
    expect(wrapper.container.firstChild.firstChild.classList[1]).toBe("green-led")
    expect(wrapper.container.firstChild.lastChild.classList[1]).toBe("green-led")
})