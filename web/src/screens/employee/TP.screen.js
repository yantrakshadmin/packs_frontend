import React, {useState} from 'react';
import cols from 'common/columns/TP.column';
import {Input, Tag} from 'antd';
import {retrieveTPs} from 'common/api/auth';
import {useTableSearch} from 'hooks/useTableSearch';
import TableWithTabHOC from 'hocs/TableWithTab.hoc';
import FilesViewModal from '../../components/FilesViewModal';
import NoPermissionAlert from 'components/NoPermissionAlert';
import {HideShowTag} from './SCS.screen';

import _ from 'lodash';

const {Search} = Input;

const ExpenseEmployeeScreen = () => {
  const [searchVal, setSearchVal] = useState(null);

  const {filteredData, loading, reload, hasPermission} = useTableSearch({
    searchVal,
    retrieve: retrieveTPs,
  });
  //const {data: mrStatusData} = useAPI('list-mrstatus/');

  const columns = [
    ...cols,
    {
      title: 'Solution Required',
      key: 'solution_required',
      render: (record) => (
        <HideShowTag>
          {record.scs.solution_flc ? <Tag>FLC</Tag> : null}
          {record.scs.solution_fsc ? <Tag>FSC</Tag> : null}
          {record.scs.solution_crate ? <Tag>Crate</Tag> : null}
          {record.scs.solution_ppbox ? <Tag>PP Box</Tag> : null}
          {record.scs.solution_palletized_box ? <Tag>Solution Palletized Box</Tag> : null}
          {record.scs.solution_palletized_crate ? <Tag>Solution Palletized Crate</Tag> : null}
          {record.scs.solution_pp ? <Tag>Solution PP</Tag> : null}
          {record.scs.solution_stacking_nesting ? <Tag>Solution Stacking Nesting</Tag> : null}
          {record.scs.solution_wp ? <Tag>Solution WP</Tag> : null}
        </HideShowTag>
      ),
    },
    {
      title: 'Action',
      key: 'operation',
      width: '7vw',
      render: (text, record) => (
        <div className="row justify-evenly">
          <FilesViewModal
            documentAvail={record.document ? true : false}
            getDocuments={() => [{document: record.document}]}
          />
          {/* <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={async (e) => {
              e.stopPropagation();
              try {
                if (record.bill.length > 0) {
                  record.bill.forEach((f) => {
                    window.open(f.document);
                  });
                }
              } catch (err) {}
            }}>
            <FontAwesomeIcon
              icon={record.bill ? (record.bill.length > 0 ? faEye : faEyeSlash) : faEyeSlash}
              style={{fontSize: 20, color: yantraColors['primary']}}
            />
          </Button> */}
          {/* <Button
            style={{
              backgroundColor: 'transparent',
              border: 'none',
              boxShadow: 'none',
              padding: '1px',
            }}
            onClick={(e) => {
              setEditingId(record.id);
              e.stopPropagation();
            }}>
            <Edit />
          </Button> */}
          {/* <DeleteWithPassword
            password={DEFAULT_PASSWORD}
            deleteHOC={deleteHOC({
              record,
              reload,
              api: deleteExpense,
              success: 'Deleted TP successfully',
              failure: 'Error in deleting TP',
            })}
          /> */}
          {/* <Popconfirm
            title="Confirm Delete"
            onConfirm={deleteHOC({
              record,
              reload,
              api: deleteExpense,
              success: 'Deleted Material Request successfully',
              failure: 'Error in deleting Material request',
            })}>
            <Button
              style={{
                backgroundColor: 'transparent',
                boxShadow: 'none',
                border: 'none',
                padding: '1px',
              }}
              onClick={(e) => e.stopPropagation()}>
              <Delete />
            </Button>
          </Popconfirm> */}
        </div>
      ),
    },
  ];

  const tabs = [
    {
      name: 'All TPs',
      key: 'allTPs',
      data: filteredData || [],
      columns,
      loading,
    },
  ];

  return (
    <NoPermissionAlert hasPermission={hasPermission}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <div style={{width: '15vw', display: 'flex', alignItems: 'flex-end'}}>
          <Search onChange={(e) => setSearchVal(e.target.value)} placeholder="Search" enterButton />
        </div>
      </div>
      <br />
      <TableWithTabHOC
        rowKey={(record) => record.id}
        refresh={reload}
        tabs={tabs}
        size="middle"
        title="TPs"
        hideRightButton={true}
        //editingId={editingId}
        //cancelEditing={cancelEditing}
        //modalBody={ExpenseForm}
        //modalWidth={80}
        //formParams={{isEmployee}}
        //expandHandleKey="transactions"
        //expandParams={{loading}}
        //ExpandBody={ExpandTable}
      />
    </NoPermissionAlert>
  );
};

export default ExpenseEmployeeScreen;
