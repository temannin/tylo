class ChangeCardIdToUuid < ActiveRecord::Migration[7.0]
  def up

    # Step 1: Add a new UUID column to the boards table
    add_column :cards, :new_id, :uuid, default: -> { 'gen_random_uuid()' }

    # Step 2: Populate the new UUID column with UUID values from the old id column
    execute 'UPDATE cards SET new_id = gen_random_uuid()'

    # Step 3: Remove the old primary key constraint and the old id column
    # execute 'ALTER TABLE buckets DROP CONSTRAINT IF EXISTS buckets_pkey CASCADE'
    remove_column :cards, :id

    # Step 4: Rename the new UUID column to id
    rename_column :cards, :new_id, :id

    # Step 5: Add a new primary key constraint on the id column
    execute 'ALTER TABLE cards ADD PRIMARY KEY (id)'
  end

  def down
    # Revert the changes made in the up function
    execute 'ALTER TABLE cards DROP CONSTRAINT IF EXISTS cards_pkey CASCADE'
    remove_column :cards, :id
    add_column :cards, :id, :integer
    execute 'ALTER TABLE cards ADD PRIMARY KEY (id)'
  end
end
