import * as React from 'react';
import type { Column } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import clsx from 'clsx';
import xor from 'lodash/xor';

export type TOptionsProps<T extends object> = {
  columns: Column<T, unknown>[];
  hiddenColumns?: string[];
  onDownloadCsv?: () => void;
  optionsDownloadText?: string;
  optionsOpenText: string;
  optionsModalHeader: string;
  optionsFieldHeader?: string;
  optionsChangeText: string;
  setHiddenColumns: (hiddenColumns: string[]) => void;
};

const OptionsComponent = <T extends object>({
  columns,
  hiddenColumns,
  onDownloadCsv,
  optionsDownloadText,
  optionsOpenText,
  optionsModalHeader,
  optionsFieldHeader,
  optionsChangeText,
  setHiddenColumns,
}: TOptionsProps<T>) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [localHiddenColls, setLocalHiddenColls] = React.useState(hiddenColumns || []);

  const openModal = () => setIsOpen(true);

  const closeModal = React.useCallback(() => {
    setIsOpen(false);

    if (hiddenColumns) {
      setLocalHiddenColls(hiddenColumns);
    }
  }, [hiddenColumns]);

  const onChangeColumn = (id: string) => () =>
    setLocalHiddenColls((prevHiddenColls) => xor(prevHiddenColls, [id]));

  const submit = React.useCallback(() => {
    setIsOpen(false);
    setHiddenColumns(localHiddenColls);
  }, [localHiddenColls, setHiddenColumns]);

  return (
    <>
      <div className="bg-grey px-9">
        {/*<Button onClick={openModal} postfixIcon={<SettingsIcon />} theme="empty">*/}
        {/*  {optionsOpenText}*/}
        {/*</Button>*/}
      </div>

      {onDownloadCsv && (
        <div className="bg-grey px-9">
          {/*<Button onClick={onDownloadCsv} postfixIcon={<CsvFileIcon />} theme="empty">*/}
          {/*  {optionsDownloadText ?? ''}*/}
          {/*</Button>*/}
        </div>
      )}

      <div
        // closeModal={closeModal}
        // isOpen={isOpen}
        // header={
        //   <div className="border-grey text-dark border-b py-6 text-2xl font-semibold">
        //     {optionsModalHeader}
        //   </div>
        // }
      >
        <div className="py-6">
          {optionsFieldHeader && (
            <div className="mb-2 text-xs font-semibold">{optionsFieldHeader}</div>
          )}

          <div className="text-dark mb-10 flex flex-wrap gap-2 font-semibold">
            {columns.map((column) => {
              const canHide = column.getCanHide();

              return (
                <button
                  key={column.id}
                  className={clsx('rounded-[100px] py-2 px-4 text-base font-semibold', {
                    'cursor-pointer border': canHide,
                    'bg-grey text-grey-dark cursor-not-allowed': !canHide,
                    'border-primary bg-primary/[.08]':
                      canHide && !localHiddenColls.includes(column.id),
                    'border-grey bg-light': canHide && localHiddenColls.includes(column.id),
                  })}
                  disabled={!canHide}
                  onClick={onChangeColumn(column.id)}
                  type="button"
                >
                  {flexRender(column.columnDef.header, {})}
                </button>
              );
            })}
          </div>

          <div className="flex justify-center">
            {/*<Button onClick={submit} theme="primary" type="button">*/}
            {/*  {optionsChangeText}*/}
            {/*</Button>*/}
          </div>
        </div>
      </div>
    </>
  );
};

export const Options = React.memo(OptionsComponent) as typeof OptionsComponent;
