const truncate = (input, max_length) => input.length > max_length ? `${input.substring(0, max_length)}...` : input;
export {truncate as default};