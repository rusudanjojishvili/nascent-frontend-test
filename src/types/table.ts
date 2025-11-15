export interface Column {
    label: string;
    key: string;
    align?: "left" | "right" | "center";
    render?: (value: any, row: any, index: number) => React.ReactNode;
  }
  