export interface noteDataModel {
  id: string | undefined;
  title: string | undefined;
  content: string | undefined;
  color: string | undefined;
  userId: string | undefined;
  lastEdit: string | number | Date;
}

export type updateNoteDataModel = {
  title: string | undefined;
  content: string | undefined;
  lastEdit: Date | string;
};

export interface singleNoteDataModel {
  title: string | undefined;
  content: string | undefined;
  color: string | undefined;
  userId: string | undefined;
  lastEdit: string | number | Date;
}
