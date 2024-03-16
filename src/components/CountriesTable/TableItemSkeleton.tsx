import React from 'react'
import style from './skeleton.module.scss';

const TableItemSkeleton = () => {
  return (
    <tr className={style.skeletonRow}>
      <td className={style.skeletonCell}></td>
      <td className={style.skeletonCell}></td>
      <td className={style.skeletonCell}></td>
      <td className={style.skeletonCell}></td>
      <td className={style.skeletonCell}></td>
    </tr>
  )
}

export default TableItemSkeleton