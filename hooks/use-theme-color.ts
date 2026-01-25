import { useColorScheme } from 'react-native';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: 'background' | 'text'
) {
  const theme = useColorScheme() ?? 'light';

  const colorFromProps = props[theme];
  if (colorFromProps) {
    return colorFromProps;
  }

  if (colorName === 'background') {
    return theme === 'dark' ? '#000' : '#fff';
  }

  return theme === 'dark' ? '#fff' : '#000';
}