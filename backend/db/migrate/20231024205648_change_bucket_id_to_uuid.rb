class ChangeBucketIdToUuid < ActiveRecord::Migration[7.0]
  def up

    # Step 1: Add a new UUID column to the boards table
    add_column :buckets, :new_id, :uuid, default: -> { 'gen_random_uuid()' }

    # Step 2: Populate the new UUID column with UUID values from the old id column
    execute 'UPDATE buckets SET new_id = gen_random_uuid()'

    # Step 3: Remove the old primary key constraint and the old id column
    execute 'ALTER TABLE buckets DROP CONSTRAINT IF EXISTS buckets_pkey CASCADE'
    remove_column :buckets, :id

    # Step 4: Rename the new UUID column to id
    rename_column :buckets, :new_id, :id

    # Step 5: Add a new primary key constraint on the id column
    execute 'ALTER TABLE buckets ADD PRIMARY KEY (id)'

    remove_column :cards, :bucket_id
    add_column :cards, :bucket_id, :uuid
    add_foreign_key :cards, :buckets, column: :bucket_id
  end

  def down
    # Revert the changes made in the up function
    remove_column :cards, :bucket_id
    add_column :cards, :bucket_id, :uuid
    remove_foreign_key :cards, :buckets, column: :bucket_id
    execute 'ALTER TABLE buckets DROP CONSTRAINT IF EXISTS buckets_pkey CASCADE'
    remove_column :buckets, :id
    add_column :buckets, :id, :integer
    execute 'ALTER TABLE buckets ADD PRIMARY KEY (id)'
  end
end
