'use client';

import { DockerImageTag } from '@/app/lib/actions';
import prettyBytes from 'pretty-bytes';

export default function DockerTag({ name, full_size }: DockerImageTag) {
  return (
    <div className='flex justify-between'>
      <span>{name}</span>
      <span>
        {prettyBytes(full_size, {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </span>
    </div>
  );
}
