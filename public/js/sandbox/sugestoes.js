// Palavras sugeridas enquanto o aluno digita (autocompletar), por linguagem.
// Além destas, o editor também sugere as palavras que já existem no próprio código.

const PY = `False None True and as assert async await break class continue def del elif else except finally for from
global if import in is lambda nonlocal not or pass raise return try while with yield print input len range int str
float bool list dict set tuple sum max min sorted reversed enumerate zip open isinstance type abs round map filter
append extend insert remove pop keys values items get update split join strip lower upper replace startswith
endswith format count index find self __init__ __str__ __repr__ super property staticmethod classmethod
ValueError TypeError KeyError IndexError ZeroDivisionError FileNotFoundError Exception json loads dumps
pandas pd read_csv DataFrame groupby head describe sort_values fillna dropna drop_duplicates merge datetime
FastAPI HTTPException BaseModel app get post put delete status_code`;

const JS = `const let var function return if else for while do switch case default break continue new class extends
constructor super this typeof instanceof in of try catch finally throw async await import export from true false
null undefined console log warn error document querySelector querySelectorAll getElementById addEventListener
removeEventListener createElement appendChild textContent innerHTML classList add remove toggle contains value
preventDefault target length push pop shift unshift map filter reduce forEach find findIndex some every includes
indexOf slice splice join split sort concat keys values entries Object Array String Number Boolean Math floor
ceil round random max min JSON parse stringify Promise resolve reject then fetch setTimeout setInterval
clearTimeout clearInterval localStorage getItem setItem Date toFixed toUpperCase toLowerCase trim replace
startsWith endsWith Map Set require module exports express listen get post put delete status send json`;

const TS = `interface type enum implements private public protected readonly string number boolean any unknown never
void Record Partial Pick Omit Promise Array as keyof`;

const REACT = `useState useEffect useMemo useCallback useRef useContext createContext useReducer memo Fragment
React export default function return className onClick onChange onSubmit value key props children
BrowserRouter MemoryRouter Routes Route Link NavLink useNavigate useParams Navigate Outlet`;

const SQL = `SELECT FROM WHERE AND OR NOT IN BETWEEN LIKE IS NULL ORDER BY ASC DESC LIMIT OFFSET DISTINCT AS
GROUP HAVING COUNT SUM AVG MIN MAX JOIN INNER LEFT RIGHT FULL OUTER CROSS ON USING UNION ALL INTERSECT EXCEPT
INSERT INTO VALUES UPDATE SET DELETE CREATE TABLE VIEW INDEX UNIQUE PRIMARY KEY FOREIGN REFERENCES DEFAULT
CHECK CONSTRAINT ALTER ADD COLUMN DROP RENAME TO IF EXISTS CASE WHEN THEN ELSE END WITH RECURSIVE OVER PARTITION
ROW_NUMBER RANK DENSE_RANK LAG LEAD COALESCE IFNULL NULLIF ROUND UPPER LOWER LENGTH SUBSTR TRIM REPLACE CONCAT
CAST INTEGER INT TEXT VARCHAR CHAR DECIMAL REAL DATE DATETIME TIMESTAMP BOOLEAN AUTO_INCREMENT AUTOINCREMENT
BEGIN TRANSACTION START COMMIT ROLLBACK SAVEPOINT EXPLAIN SHOW TABLES DESCRIBE DATABASE USE NOW CURDATE YEAR
MONTH DAY DATEDIFF TIMESTAMPDIFF DATE_FORMAT ENUM TINYINT BIGINT ENGINE InnoDB CHARSET utf8mb4 GRANT REVOKE
USER IDENTIFIED PRIVILEGES PROCEDURE FUNCTION RETURNS DETERMINISTIC CALL DECLARE TRIGGER BEFORE AFTER EACH ROW
NEW OLD EVENT SCHEDULE EVERY
clientes produtos pedidos itens_pedido funcionarios contas sessoes vendas_vendedor
id nome email cpf cidade uf telefone nascimento limite ativo plano data_cadastro criado_em ultimo_pedido
categoria preco estoque cliente_id valor status data pedido_id produto_id quantidade cargo departamento salario
titular saldo usuario expira_em regiao vendedor total`;

const GO = `package import func main var const type struct interface map chan go defer select range return if else
for switch case default break continue nil true false make new len cap append delete copy panic recover string
int int64 float64 bool byte rune error fmt Println Printf Sprintf Errorf errors New Is As strings strconv Itoa
Atoi http HandleFunc ListenAndServe ResponseWriter Request json Marshal NewEncoder Encode sync WaitGroup Mutex
Add Done Wait Lock Unlock context WithTimeout Background time Second Millisecond Sleep testing`;

const CSHARP = `using namespace class public private protected internal static void int string bool double decimal
var new return if else for foreach in while do switch case default break continue try catch finally throw
async await Task null true false this base interface abstract override virtual get set List Dictionary
Console WriteLine ReadLine Write Math Linq Where Select OrderBy OrderByDescending First FirstOrDefault Any All
Count Sum Average ToList ToString Exception ArgumentException IEnumerable record readonly const enum`;

const JAVA = `package import public private protected class interface extends implements static final void int long
double boolean char String new return if else for while do switch case default break continue try catch finally
throw throws null true false this super List ArrayList Map HashMap TreeMap Set HashSet Optional stream filter
map collect Collectors toList forEach System out println printf Math Integer Double parseInt Exception
RuntimeException Override Thread Runnable ExecutorService Executors record`;

const CPP = `include iostream string vector map set algorithm cmath iomanip fstream sstream memory thread mutex
using namespace std int main return void char bool double float long short unsigned const constexpr auto static
if else for while do switch case default break continue true false nullptr new delete class struct public private
protected virtual override friend this template typename try catch throw cout cin cerr endl getline string vector
push_back pop_back size empty begin end sort find insert erase at front back size_t map pair make_pair first second
unique_ptr make_unique shared_ptr make_shared setprecision fixed sqrt pow abs max min swap reference operator`;

const CSS = `color background background-color margin padding border border-radius width height max-width min-width
display flex grid block inline-block none position relative absolute fixed sticky top left right bottom
font-size font-weight font-family line-height text-align justify-content align-items gap flex-direction
flex-wrap grid-template-columns grid-template-areas box-sizing border-box transition transform animation
opacity cursor pointer hover focus media screen var root z-index overflow hidden auto center space-between`;

const HTML = `html head body title meta link script style div span header nav main section article aside footer
h1 h2 h3 p a img ul ol li table thead tbody tr th td form label input button select option textarea
class id href src alt type name value placeholder required for lang charset`;

const lista = (...txt) => [...new Set(txt.join(" ").split(/\s+/).filter(Boolean))];

const POR_MODO = {
  python: lista(PY),
  javascript: lista(JS),
  "text/typescript": lista(JS, TS),
  jsx: lista(JS, REACT, HTML),
  "text/x-mysql": lista(SQL),
  "text/x-sqlite": lista(SQL),
  "text/x-go": lista(GO),
  "text/x-csharp": lista(CSHARP),
  "text/x-java": lista(JAVA),
  "text/x-c++src": lista(CPP),
  css: lista(CSS),
  htmlmixed: lista(HTML, CSS)
};

export const palavrasDoModo = (modo) => POR_MODO[modo] || [];
// Em SQL as palavras-chave não diferenciam maiúsculas; a sugestão segue o jeito que o aluno digitou.
export const ignoraCaixa = (modo) => /sql/.test(modo);
