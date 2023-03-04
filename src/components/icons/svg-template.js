const comments = `
`;
const template = (variables, { tpl }) => {
  return tpl`
${comments}

${variables.imports};

${variables.interfaces};

const ${variables.componentName} = (${variables.props}) => (
  ${variables.jsx}
);

${variables.exports};
`;
};

module.exports = template;
