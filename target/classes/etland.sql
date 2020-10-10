SELECT T2.*

  FROM (SELECT @ROWNUM := @ROWNUM + 1 AS ROWNUM

            T.CUSTOMER_ID customerID, 
	        T.CUSTOMER_NAME customerName, 
	        T.PASSWORD, 
	        T.SSN ,
	        T.PHONE,
	        T.CITY,
	        T.ADDRESS,
	        T.POSTALCODE

  FROM  CUSTOMERS T

      ,(SELECT @ROWNUM := 0) R

      

    ) T2

WHERE T2.ROWNUM BETWEEN 1 AND 10

ORDER BY T2.ROWNUM ASC;