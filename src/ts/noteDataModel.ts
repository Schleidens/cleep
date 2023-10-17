export interface noteDataModel {
  id: string | undefined;
  title: string | undefined;
  content: string | undefined;
  color: string | undefined;
  userId: string | undefined;
  lastEdit: string | number | Date;
}

export type updateDataModel = {
  title: string;
  content: string;
  lastEdit: Date;
};

export interface singleNoteDataModel {
  title: string | undefined;
  content: string | undefined;
  color: string | undefined;
  userId: string | undefined;
  lastEdit: string | number | Date;
}
