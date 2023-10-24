class ChangeBoardIdToUuid < ActiveRecord::Migration[7.0]
  def up

    # Step 1: Add a new UUID column to the boards table
    add_column :boards, :new_id, :uuid, default: -> { 'gen_random_uuid()' }

    # Step 2: Populate the new UUID column with UUID values from the old id column
    execute 'UPDATE boards SET new_id = gen_random_uuid()'

    # Step 3: Remove the old primary key constraint and the old id column
    execute 'ALTER TABLE boards DROP CONSTRAINT IF EXISTS boards_pkey CASCADE'
    remove_column :boards, :id

    # Step 4: Rename the new UUID column to id
    rename_column :boards, :new_id, :id

    # Step 5: Add a new primary key constraint on the id column
    execute 'ALTER TABLE boards ADD PRIMARY KEY (id)'

    remove_column :buckets, :board_id
    add_column :buckets, :board_id, :uuid
    add_foreign_key :buckets, :boards, column: :board_id
  end

  def down
    # Revert the changes
    remove_foreign_key :buckets, :boards
    change_column :buckets, :board_id, :integer
    add_foreign_key :buckets, :boards, column: :board_id
    execute 'ALTER TABLE boards DROP CONSTRAINT IF EXISTS boards_pkey CASCADE'
    remove_column :boards, :id
    add_column :boards, :id, :integer
    execute 'ALTER TABLE boards ADD PRIMARY KEY (id)'
  end
end
