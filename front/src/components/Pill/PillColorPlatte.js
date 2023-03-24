

const UncontrolledColorPicker = () => (
  <ColorPalette
    onChange={color => alert(`Color selected: ${color}`)}
    defaultColor={'#C0392B'}
    colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
    title={"Uncontrolled Color Palette:"}
    icon={
      <Text>✔</Text>︎
      // Icon can just be text or ASCII
    }
  />
)

const ControlledColorPicker = () => {
  let selectedColor = '#C0392B';
  return (
    <ColorPalette
      onChange={color => selectedColor = color}
      value={selectedColor}
      colors={['#C0392B', '#E74C3C', '#9B59B6', '#8E44AD', '#2980B9']}
      title={"Controlled Color Palette:"}
      icon={
        <Icon name={'check-circle-o'} size={25} color={'black'} />
      // React-Native-Vector-Icons Example
    }
  />)
}