-- POSTGRESSQL SCRIPT


-- GET ALL FROM CATEGORY
SELECT * FROM Category

-- GET ALL FROM CATEGORY BY ID
SELECT * FROM Category WHERE id = 1

-- GET ALL FROM CATEGORY BY NAME
SELECT * FROM Category WHERE name = 'name'

-- GET ALL FROM CATEGORY BY NAME LIKE
SELECT * FROM Category WHERE name LIKE '%name%'

-----------------------------------------------------------------

-- GET ALL FROM SUBCATEGORY
SELECT * FROM SubCategory

-- GET ALL FROM SUBCATEGORY BY ID
SELECT * FROM SubCategory WHERE id = 1

-- GET ALL FROM SUBCATEGORY BY NAME
SELECT * FROM SubCategory WHERE name = 'name'

-- GET ALL FROM SUBCATEGORY BY NAME LIKE
SELECT * FROM SubCategory WHERE name LIKE '%name%'


-----------------------------------------------------------------

-- GET ALL FROM SERVICE
SELECT * FROM Service

-- GET ALL FROM SERVICE BY ID
SELECT * FROM Service WHERE id = 1

-- GET ALL FROM SERVICE BY TITLE
SELECT * FROM Service WHERE title = 'title'

-- GET ALL FROM SERVICE BY TITLE LIKE
SELECT * FROM Service WHERE title LIKE '%title%'


-- GET ALL FROM SERVICE BY DESCRIPTION
SELECT * FROM Service WHERE desc = 'description'

-- GET ALL FROM SERVICE BY DESCRIPTION LIKE
SELECT * FROM Service WHERE desc LIKE '%description%'


-- GET ALL FROM SERVICE BY CATEGORY ID
SELECT * FROM Service WHERE catId = 1

-- GET ALL FROM SERVICE BY CATEGORY NAME (JOIN TABLES)
SELECT * FROM Service INNER JOIN Category ON Service.catId = Category.id WHERE Category.name = 'category'

-- GET ALL FROM SERVICE BY CATEGORY NAME (JOIN TABLES) LIKE
SELECT * FROM Service INNER JOIN Category ON Service.catId = Category.id WHERE Category.name LIKE '%category%'

-- GET ALL FROM SERVICE BY SUBCATEGORY ID
SELECT * FROM Service WHERE subCatId = 1

-- GET ALL FROM SERVICE BY SUBCATEGORY NAME (JOIN TABLES)
SELECT * FROM Service INNER JOIN SubCategory ON Service.subCatId = SubCategory.id WHERE SubCategory.name = 'subcategory'

-- GET ALL FROM SERVICE BY SUBCATEGORY NAME (JOIN TABLES) LIKE
SELECT * FROM Service INNER JOIN SubCategory ON Service.subCatId = SubCategory.id WHERE SubCategory.name LIKE '%subcategory%'

-- GET ALL FROM SERVICE BY USER ID
SELECT * FROM Service WHERE userId = 1

-- GET ALL FROM SERVICE BY USER NAME (JOIN TABLES)
SELECT * FROM Service INNER JOIN User ON Service.userId = User.id WHERE User.name = 'user'

-- GET ALL FROM SERVICE BY USER NAME (JOIN TABLES) LIKE
SELECT * FROM Service INNER JOIN User ON Service.userId = User.id WHERE User.name LIKE '%user%'

-- GET ALL FROM SERVICE BY STATUS
SELECT * FROM Service WHERE status = 1


-- GET ALL FROM SERVICE BY LOCATION
SELECT * FROM Service WHERE location = 'location'


-- GET ALL FROM SERVICE BY LOCATION LIKE
SELECT * FROM Service WHERE location LIKE '%location%'

-- GET ALL FROM SERVICE BY CATEGORY ID AND SUBCATEGORY ID
SELECT * FROM Service WHERE catId = 1 AND subCatId = 1

-- GET ALL FROM SERVICE BY CATEGORY ID AND SUBCATEGORY ID AND STATUS
SELECT * FROM Service WHERE catId = 1 AND subCatId = 1 AND status = 1

-- GET ALL FROM SERVICE BY CATEGORY ID AND SUBCATEGORY ID AND STATUS AND USER ID
SELECT * FROM Service WHERE catId = 1 AND subCatId = 1 AND status = 1 AND userId = 1

-- GET ALL FROM SERVICE BY CATEGORY NAME AND SUBCATEGORY NAME AND STATUS AND USER NAME (JOIN TABLES)
SELECT * FROM Service INNER JOIN Category ON Service.catId = Category.id INNER JOIN SubCategory ON Service.subCatId = SubCategory.id INNER JOIN User ON Service.userId = User.id WHERE Category.name = 'category' AND SubCategory.name = 'subcategory' AND User.name = 'user'

-- GET ALL FROM SERVICE BY CATEGORY NAME AND SUBCATEGORY NAME AND STATUS AND USER NAME (JOIN TABLES) LIKE
SELECT * FROM Service INNER JOIN Category ON Service.catId = Category.id INNER JOIN SubCategory ON Service.subCatId = SubCategory.id INNER JOIN User ON Service.userId = User.id WHERE Category.name LIKE '%category%' AND SubCategory.name LIKE '%subcategory%' AND User.name LIKE '%user%'


-- GET ALL FROM SERVICE BY CREATED_AT


-- GET ALL FROM SERVICE BY UPDATED_AT



-----------------------------------------------------------------

-- GET ALL FROM USER
SELECT * FROM User

-- GET ALL FROM USER BY ID
SELECT * FROM User WHERE id = 1

-- GET ALL FROM USER BY FIRST NANE
SELECT * FROM User WHERE firstName = 'first_name'


-- GET ALL FROM USER BY FIRST NANE LIKE
SELECT * FROM User WHERE firstName LIKE '%first_name%'

-- GET ALL FROM USER BY LAST NAME
SELECT * FROM User WHERE lastName = 'last_name'

-- GET ALL FROM USER BY LAST NAME LIKE
SELECT * FROM User WHERE lastName LIKE '%last_name%'

-- GET ALL FROM USER BY EMAIL
SELECT * FROM User WHERE email = 'email'

-- GET ALL FROM USER BY EMAIL LIKE
SELECT * FROM User WHERE email LIKE '%email%'

-- GET ALL FROM USER BY LOCATION
SELECT * FROM User WHERE location = 'location'

-- GET ALL FROM USER BY LOCATION LIKE
SELECT * FROM User WHERE location LIKE '%location%'


-----------------------------------------------------------------

