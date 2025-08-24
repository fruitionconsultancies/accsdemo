export default function decorate(block) {
  const config = {};
  const contentRows = [];
  const knownConfigKeys = ['bgcolor', 'textalign', 'padding', 'color', 'class','borderradius'];

  // Step 1: Extract configuration rows (key-value pairs)
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    if (cells.length >= 2) {
      const key = cells[0].textContent.trim().toLowerCase();
      const value = cells[1].textContent.trim();

      if (knownConfigKeys.includes(key)) {
        config[key] = value;
        return; // Skip pushing this as content
      }
    }
    // If not a valid config row, treat as content
    contentRows.push(row);
  });
  // Step 2: Apply config to the block
  // You can handle these however you want — here are some examples:
  Object.entries(config).forEach(([key, value]) => {
    console.log(key);
    console.log(value);
  });

  if (config.bgcolor) {
    block.style.backgroundColor = config.bgcolor;
  }

  if (config.textalign) {
    block.style.textAlign = config.textalign;
  }

  if (config.borderradius) {
    block.style.borderRadius = config.borderradius;
  }

  if (config.padding) {
    block.style.padding = config.padding;
  }

  if (config.color) {
    block.style.color = config.color;
  }

  if (config.class) {
    block.classList.add(...config.class.split(/\s+/));
  }

  // Step 3: Clean the block and re-insert only content rows
  block.innerHTML = ''; // Clear all children
  contentRows.forEach((row) => block.appendChild(row)); // Add back content rows

  const cols = [...block.firstElementChild.children];
  block.classList.add(`columnswithbg-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columnswithbg-img-col');
        }
      }
    });
  });
}
